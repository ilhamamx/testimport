firebaseDB = require("../../../db/firebase");
const { db, createRef, storage, uploadTaskPromise } = firebaseDB;
const { getCustomerByPhone } = require("../../customers");
const { getAccountByPhone } = require("../../account");
const { getCollaborationByCustomerAndCompany } = require("../../collaboration");
const { getMediaByID, downloadFromUrl } = require("../facebook/media");


const parseJSONWhatsAppMessage = async (req) => {
  let collaborationRef = await db.collection("collaborations");
  console.log("request : " + req.object);
  if (req.object) {
    // check if message is exist
    if (
      req.entry &&
      req.entry[0].changes &&
      req.entry[0].changes[0] &&
      req.entry[0].changes[0].value &&
      req.entry[0].changes[0].value.messages &&
      req.entry[0].changes[0].value.messages[0]
    ) {
      // get data from whatsapp (parsing jsonnya)
      const object = req.object;
      const entry_id = req.entry[0].id;
      let messaging_product = undefined;
      let display_phone_number = undefined;
      let profile_name = undefined;
      let wa_id = undefined;
      let messages_from = undefined;
      let messages_wamid_id = undefined;
      let messages_timestamp = undefined;
      let messages_text = undefined;
      let messages_type = undefined;
      let messages_img_caption = undefined;
      let messages_img_mime_type = undefined;
      let messages_img_sha256 = undefined;
      let messages_img_id = undefined;
      let messages_img_url = undefined;
      let field = undefined;
      // parsing JSON whatsapp
      if (req.entry[0].changes[0].value.metadata) {
        if (req.entry[0].changes[0].value.metadata.display_phone_number) {
          display_phone_number =
            req.entry[0].changes[0].value.metadata.display_phone_number;
        }
      }
      if (req.entry[0].changes[0].value.messaging_product) {
        messaging_product = req.entry[0].changes[0].value.messaging_product;
      }
      if (req.entry[0].changes[0].value.contacts[0]) {
        if (req.entry[0].changes[0].value.contacts[0].profile) {
          if (req.entry[0].changes[0].value.contacts[0].profile.name) {
            profile_name =
              req.entry[0].changes[0].value.contacts[0].profile.name;
          }
        }
        if (req.entry[0].changes[0].value.contacts[0].wa_id) {
          wa_id = req.entry[0].changes[0].value.contacts[0].wa_id;
        }
      }
      if (req.entry[0].changes[0].value.messages[0]) {
        if (req.entry[0].changes[0].value.messages[0].from) {
          messages_from = req.entry[0].changes[0].value.messages[0].from;
        }
        if (req.entry[0].changes[0].value.messages[0].id) {
          messages_wamid_id = req.entry[0].changes[0].value.messages[0].id;
        }
        if (req.entry[0].changes[0].value.messages[0].timestamp) {
          messages_timestamp =
            req.entry[0].changes[0].value.messages[0].timestamp;
        }
        if (req.entry[0].changes[0].value.messages[0].type) {
          messages_type = req.entry[0].changes[0].value.messages[0].type;
        }

        // cek type message
        if (messages_type == "text") {
          if (req.entry[0].changes[0].value.messages[0].text) {
            if (req.entry[0].changes[0].value.messages[0].text.body) {
              messages_text =
                req.entry[0].changes[0].value.messages[0].text.body;
            }
          }
        }else if (messages_type == "image") {
          if (req.entry[0].changes[0].value.messages[0].image) {
            if (req.entry[0].changes[0].value.messages[0].image.caption) {
              messages_img_caption =
                req.entry[0].changes[0].value.messages[0].image.caption;
            }
            if (req.entry[0].changes[0].value.messages[0].image.mime_type) {
              messages_img_mime_type =
                req.entry[0].changes[0].value.messages[0].image.mime_type;
            }
            if (req.entry[0].changes[0].value.messages[0].image.sha256) {
              messages_img_sha256 =
                req.entry[0].changes[0].value.messages[0].image.sha256;
            }
            if (req.entry[0].changes[0].value.messages[0].image.id) {
              messages_img_id =
                req.entry[0].changes[0].value.messages[0].image.id;
            }
          }
        }
      }
      if (req.entry[0].changes[0].field) {
        field = req.entry[0].changes[0].field;
      }

      // convert unix timestamp to date
      const milliseconds = messages_timestamp * 1000;
      const dateObject = new Date(milliseconds);
      console.log("tanggal : " + dateObject);

      let customerRef;
      let companyRef;

      // get company by (to) phone number
      const account = await getAccountByPhone(display_phone_number);
      // if company is exist, createRef from companyID
      if (account[0]) {
        companyRef = createRef("company", account[0].company.id);
      }

      // get customer by (from) phone number
      const customer = await getCustomerByPhone(messages_from);
      // if customer is null, create customer by phone number, then createRef from customerID
      if (!customer[0]) {
        const customersRef = await db.collection("customers");
        await customersRef
          .add({
            phoneNumber: messages_from,
            profile_name: profile_name ? profile_name : "",
            createdAt: new Date(),
            updatedAt: new Date(),
            companyID: companyRef
          })
          .then((ref) => {
            customerRef = createRef("customers", ref.id);
          })
          .catch((error) => {
            //TODO error harus ngapain
          });
      } else {
        customerRef = createRef("customers", customer[0].id);
      }

      // get collaboration, yang di cek adalah jika customer sama, company sama
      let getCollaboration = await getCollaborationByCustomerAndCompany(
        customerRef,
        companyRef
      );
      let collaboration;
      // cek jika percakapan pertama maka buat collaboration
      if (!getCollaboration[0]) {
        await collaborationRef
          .add({
            created: new Date(),
            updatedAt: new Date(),
            customer: customerRef,
            company: companyRef,
            isActive: true,
            lastInteractionChannel: "whatsapp",
            lastInteractionAt: new Date(),
          })
          .then((ref) => {
            console.log("collaboration id x : " + ref.id);
            collaboration = ref;
          })
          .catch((error) => {
            //TODO error harus ngapain
          });
      }
      // cek jika bukan percakapan pertama dan belum expired maka buat message di collaboration
      else {
        console.log("collaboration id y : " + getCollaboration[0].id);

        collaborationRef = await db.collection(`collaborations`).doc(getCollaboration[0].id);
        await collaborationRef.update({
          lastInteractionChannel: "whatsapp",
          lastInteractionAt: new Date(),
          updatedAt: new Date(),
        }).then(() => {
          collaboration = collaborationRef;
        })
      }

      console.log("collaboration : " + collaboration);
      let collaborationMessagesRef = await db.collection(
        "collaborations/" + collaboration.id + "/messages"
      );

      // handle message by type
      if (messages_type === "text") {
      } else if (messages_type === "image") {
        if(messages_img_id){
          //hardcode token for testing purpose
          //get url from facebook whatsapp cloud API
          // const dataMedia = await getMediaByID(messages_img_id, "EAAerGJUyyNcBAKNyN5N4VvpWqAu9GTBc8ctRir9LQ5TG4UkXNgkHQvkNLmA4TNdVdecp8SLt2TzMQHTEx1GxWZA3YsNpzZAQU7aB5aqjp0Ydzs2RUTssZAlZBXJ6MJ3oQDZCaY5gzffuc1QKr9mVZC7m98mmZCqZB02gqXUEyewKCqZC0BZA38xFNahCWN9iX2DrZC9IBz4pV17ajlqLJ5ZBdZC3GiB5Dg6yMjS0ZD")  
          const dataMedia = await getMediaByID(messages_img_id, account[0].company.id)
          if(dataMedia){
            //get media file from facebook whatsapp cloud API
            // const file = await downloadFromUrl(dataMedia.url, "EAAerGJUyyNcBAKNyN5N4VvpWqAu9GTBc8ctRir9LQ5TG4UkXNgkHQvkNLmA4TNdVdecp8SLt2TzMQHTEx1GxWZA3YsNpzZAQU7aB5aqjp0Ydzs2RUTssZAlZBXJ6MJ3oQDZCaY5gzffuc1QKr9mVZC7m98mmZCqZB02gqXUEyewKCqZC0BZA38xFNahCWN9iX2DrZC9IBz4pV17ajlqLJ5ZBdZC3GiB5Dg6yMjS0ZD")
            const file = await downloadFromUrl(dataMedia.url, account[0].company.id)
            if(file){
              const fileBase64 = await Buffer.from(file.data, 'binary').toString('base64')
              const fileUpload64 = Buffer.from(fileBase64, 'base64');

              const metadata = {
                contentType: messages_img_mime_type,
                fileName: messages_img_id,
              }

              const path = `images/${account[0].company.id}/chat/${messages_img_id}`

              //upload file to firebase storage
              messages_img_url = await uploadTaskPromise(path, fileUpload64, metadata);

            }
          }
        }
      }

      // create message
      await collaborationMessagesRef
        .add({
          channel: "whatsapp",
          createdAt: new Date(),
          updatedAt: new Date(),
          messageType: messages_type,
          textContent: messages_text ? messages_text : messages_img_caption ? messages_img_caption : "",
          mediaUrl: messages_img_url ? messages_img_url : "",
          // user: //jika outbound
          customer: customerRef,
          // status: //jika outbound
          // submitedAt: //jika outbound
          // deliveredAt: //jika outbound
          // readAt: //jika outbound
        })
        .then((ref) => {
          console.log("message created");
        });
    }
  }
};

module.exports = {
  parseJSONWhatsAppMessage,
};

