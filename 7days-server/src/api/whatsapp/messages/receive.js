firebaseDB = require("../../../db/firebase");
const { db, createRef } = firebaseDB;
const { getCustomerByPhone } = require("../../customers");
const { getAccountByPhone } = require("../../account");
const { getCollaborationByCustomerAndCompany } = require("../../collaboration");

const parseJSONWhatsAppMessage = async (req) => {
  const collaborationRef = await db.collection("collaborations");
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
        }
      }
      if (req.entry[0].changes[0].field) {
        field = req.entry[0].changes[0].field;
      }

      // temporary log
      console.log("object : " + object);
      console.log("entry id : " + entry_id);
      console.log("messaging product : " + messaging_product);
      console.log("display phone number : " + display_phone_number);
      console.log("profile name : " + profile_name);
      console.log("wa id : " + wa_id);
      console.log("message form : " + messages_from);
      console.log("message wamid id : " + messages_wamid_id);
      console.log("message timestamp : " + messages_timestamp);
      console.log("message text : " + messages_text);
      console.log("message type : " + messages_type);
      console.log("field : " + field);

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
        customersRef
          .add({
            phoneNumber: messages_from,
            profile_name: profile_name ? profile_name : "",
            createdAt: new Date(),
            updatedAt: new Date(),
            companyID: account[0].company.id,
          })
          .then((ref) => {
            customerRef = createRef("customers", ref);
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
        await getCollaboration[0].update({
          lastInteractionChannel: "whatsapp",
          lastInteractionAt: new Date(),
          updatedAt: new Date(),
        });

        collaboration = getCollaboration[0];
      }

      console.log("collaboration : " + collaboration);
      let collaborationMessagesRef = await db.collection(
        "collaborations/" + collaboration.id + "/messages"
      );

      // create message
      await collaborationMessagesRef
        .add({
          channel: "whatsapp",
          createdAt: new Date(),
          updatedAt: new Date(),
          messageType: messages_type,
          textContent: messages_text ? messages_text : "",
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
