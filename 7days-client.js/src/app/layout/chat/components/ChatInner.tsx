import { FC, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import * as Chat from "../../../../actions/chat";
import * as actAccount from "../../../../actions/account";
import {toAbsoluteUrl} from "../../../../resources/helpers/";
import ChatMessage from "./ChatMessage";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { RootState } from '../../../../setup/redux/store'
import * as chat from "../../../modules/chat/redux/ChatSlice";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { User ,Account,Customer, Message as newMessageModel, HandledMessageListItem } from "../../../layout/chat/models/ChatItem.model"
import { Timestamp } from "../../../../db";
import { createRef } from "../../../../db/connection";
import * as lc from "../../../modules/localstorage/index"
import { storage } from "../../../../../src/db"
import { checkFile,formatSize } from "./ChatUtil"
import { v4 as uuidv4 } from 'uuid';


const mapState = (state: RootState) => ({ chat: state.Chat })
const connector = connect(mapState, chat.ChatSlice.actions)

type Props = {
  isDrawer?: boolean,
  propsredux?: ConnectedProps<typeof connector>
  customer?: Customer;
  user?: User;
};

// const bufferMessages = defaultMessages;// ganti dengan get message dari firebase, dan 

const ChatInner: FC<Props> = ({ isDrawer = false }, props) => {
  
  const { t } = useTranslation();
  const channelIcon = "/media/icons/channel/"
  const { propsredux, customer,user } = props;
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const [customerChat, setCustomerChat] = useState<Customer|undefined>(customer); // Selected Customer
  const [accountChat, setAccountChat] = useState<Account>(); // Selected Customer
  const [ListAccountChat, setListAccountChat] = useState<Account[]>([]); //List Message 
  const [userChat, setUserChat] = useState<User>(); // Selected User
  const [collabs, setcollabs] = useState<HandledMessageListItem>(); //Selected Collaboration
  const [message, setMessage] = useState<string>(""); // Input Message
  const [companyID, setCompanyID] = useState<string>(lc.getItemLC(lc.LCName.CompanyID).toString()); // Input Message
  const dispatch = useDispatch();
  const selectedChat = useSelector((state: RootState) => state.Chat.selectedChat); //Uid Collaboration
  let collablist = useSelector((state: RootState) => state.Chat.chatList); //list Collaboration
  const [messages, setMessages] = useState<newMessageModel[]>([]); //List Message 
  const [channel, setChannel] = useState<string>(""); //Selected Channel or Last Interaction Channel
  const [file, setFile] = useState<File>();
  const [fileSize, setFileSize] =useState<string>("");
  const [fileName, setFileName] =useState<string>("");
  const [mediaURL, setMediaURL] =useState<string|undefined>("");
  const [messageType, setmessageType] =useState<string|undefined>("text");
  const [prevFile, setPrevFile] = useState("");

  //Get Uploaded File
  const setPreviewFile = async (event: any) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    } 
  }

  useEffect(() => {
    console.log(">>> ISI FIle : "+file);
    if(file){
      //Set File Attribut
      const size: number = file.size;
      setPrevFile(URL.createObjectURL(file));
      setFileName(file.name);
      setFileSize(formatSize(size));

      //Check File Type 
      const tempArrFileType:string = file.type;
      const arryFileType = tempArrFileType.split("/")
      if(arryFileType===undefined || arryFileType.length < 1 || arryFileType[0]=== undefined){
        //return error
        alert(t("HC.Error.InvalidURL"));
        return;
      }else{
        // const [result, error] = checkFile2("image","jpg",5);
        // console.log("---->>"+result+"----"+error);
        const [result, error,maxSize] = checkFile(arryFileType[0],arryFileType[1],size);
        if(error !== undefined){
          if (maxSize !== 0) {
            alert(t("HC.Error."+error).replace("<<size>>",maxSize+" MB"));
          } else {
            alert(t("HC.Error."+error));
          }
          return;
        }
        
        if (result !== undefined) {
          setmessageType(result.toString());
        }
      } 
    }
  },[file])

  //Upload File To Storage
  const uploadFile = async (companyID : string) => {
    let fileURL = '';
    if (file) {
      // setPicture(event.target.files[0])
      const uuid = uuidv4()
      const task = storage
        .ref(companyID+"/"+messageType+"s/chat/sent/"+uuid)
        .child(fileName)
        .put(file);
      await task
        .then(async(snapshot) => {
          return storage
            .ref(companyID+"/"+messageType+"s/chat/sent/"+uuid)
            .child(fileName)
            .getDownloadURL()
            .then((url) => {
              console.log("media url : " + url);
              fileURL = url;
            });
        })
        .catch((error) => {
          console.log("error : " + error.message);
        });
    }
    return fileURL 
  }

  useEffect(() => {    
    // Update Unread Messages
    Chat.clearUnreadMessages(selectedChat);
    // Clear Unread Message On Redux
    dispatch(chat.updateUnreadMessage(selectedChat))

    const lastChannel = collabs?.lastInteractionChannel.toString().toLowerCase();
    if(lastChannel!== undefined){
      setChannel(lastChannel)
    }else{
      setChannel("whatsapp")
    }

    // Set Selected Collaboration = Uid From Collaboration
    setcollabs(collablist.find(obj => {
      return obj.id == selectedChat;
    }));     

    //Get and Set List Chat By Selected Collaboration
    Chat
    .fetchMessageCollaboration(selectedChat)
    .then(async(ListMessages: newMessageModel[]) => {
      //Set Messagelist State
      setMessages(ListMessages);
      //Set Messagelist To Redux
      dispatch(chat.setListMessages(ListMessages))
    });
  }, [selectedChat]);

  useEffect(()=> {
    setUserChat(collabs?.userModel);
    //Set Customer from Selected Collaboration 
    setCustomerChat(collabs?.customerModel);
  },[collabs])

  const sendMessage = async () => {
    let firebaseMediaURL = "";
    if(messageType !== "text"){
      firebaseMediaURL = await Promise.resolve(uploadFile(companyID));
      if(firebaseMediaURL === "" || firebaseMediaURL === undefined){
        alert(t("HC.Error.FailedUpload"));
        return
      }
    }else{
      if(message === ""){
        return
      }
    }

    //Create New Message Model
    let newMessage: newMessageModel = {
      channel: channel,
      createdAt: Timestamp.now(),
      destination: "outbound",
      customer: collabs?.customer,
      user: collabs?.toUser,
      mediaUrl: firebaseMediaURL,
      isActive: true,
      messageType: messageType,
      textContent: message,
      previewurl: true,
      updatedAt: Timestamp.now(),
      voice: false,
      filename: fileName,
      filesize: fileSize,
      collaboration: createRef("collaborations", selectedChat)
    };
    
    //Update Text Box to Empty Text
    toggleChatUpdateFlat(!chatUpdateFlag);
    setMessage("");
    setFile(undefined);
    setFileSize("");
    setFileName("");
    setMediaURL("");
    setmessageType("text");
    setPrevFile("");

    const setNewMessage = (newMessage: newMessageModel) => {
      //Set New Message To List Message
      setMessages(prevMessage => [
        ...prevMessage,newMessage]); 
    }

    const onFetchAccountFinished = (accountChat: Account|undefined) => {
      if(accountChat){
        //Save New Message to Firebase
        // const NewListMessages = [...messages,newMessage];
        setNewMessage(newMessage);
        // setMessages(NewListMessages);
        //Save New Message To Redux
        dispatch(chat.setListMessages(messages));
        Chat.createCollaborationMessage(newMessage, companyID ,selectedChat, accountChat, customerChat);

        const newCollabList: HandledMessageListItem[]= [];
        if(collabs!== undefined){
          let newCollab = collabs;
          collablist.map((item) => {
            if (item.id === selectedChat){
              if(newMessage.messageType !== undefined){
                let lastmessage = newMessage.textContent;
                if ((newMessage.textContent === "" || newMessage.textContent === undefined) && newMessage.filename !== undefined) {
                  lastmessage = newMessage.filename
                }
                item =  {...item, 
                  lastInteractionAt: newMessage.createdAt,
                  lastInteractionChannel: newMessage.channel,
                  lastInteractionMessage: lastmessage,
                  lastInteractionType: newMessage.messageType};
                newCollab = item;
                Chat.updateLastInteraction(selectedChat, newMessage);
                newCollabList.push(newCollab);
                return item;
              }
            }
          });
          collablist.map((item) => {
            if (item.id !== selectedChat){
              newCollabList.push(item);
              return item;
            }
          });
          setcollabs(newCollab);
          dispatch(chat.setChatList(newCollabList));   
        }
      }else{
        //severe
        console.log("Check Account Pengiriman No Data Account");
      }
    }

    actAccount.fetchAccountByCompanyAndChannel(companyID,channel)
    .then(async response => {
      const temAccount = response.find(obj => {
        // Check account
        
        return obj;
      });
      onFetchAccountFinished(temAccount);
    });
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="card-body"
      style={{ border: "top bottom 10px solid #9899AC" }}
      id={isDrawer ? "kt_drawer_chat_messenger_body" : "kt_chat_messenger_body"}
    >
      <div
        className={clsx("scroll-y me-n5 pe-5", {
          "h-500px ": !isDrawer,//h-lg-auto
        })}
        data-kt-element="messages"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        data-kt-scroll-dependencies={
          isDrawer
            ? "#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
            : "#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
        }
        data-kt-scroll-wrappers={
          isDrawer
            ? "#kt_drawer_chat_messenger_body"
            : "#kt_content, #kt_chat_messenger_body"
        }
        data-kt-scroll-offset={isDrawer ? "0px" : "-2px"}
      >
        {messages?.map((message, index) => {
          return (
            <ChatMessage
              message={message}
              key={index}
              index={index}
              isDrawer={isDrawer}
              customer={message?.customerModel}
              user={message?.userModel}
            />
          );
        })}
      </div>

      <div
        className="card-footer pt-4"
        id={
          isDrawer
            ? "kt_drawer_chat_messenger_footer"
            : "kt_chat_messenger_footer"
        }
      >
        <textarea
          className="form-control form-control-flush mb-3"
          rows={1}
          data-kt-element="input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <div className="d-flex flex-stack">
          <div className="d-flex align-items-center me-2">
            <label
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              // type="button"
              data-bs-toggle="tooltip"
              data-kt-image-input-action="change"
              title={t("HC.Info.Upload")}
            >
              <i className="bi bi-upload text-custom fs-1 p-5"></i>

              {/* <input id="contact-avatar" onChange={setPreviewFile} type="file" name="avatar"/>  */}
              <input id="contact-avatar" onChange={setPreviewFile} type="file" name="avatar"/> 
              {/* accept=".png, .jpg, .jpeg" /> */}
            </label>
            {file && <label>{fileName}</label>}
          </div>

          <div className="d-flex align-items-center me-2 bg-primary">
            <button
              className='btn btn-primary'
              type='button'
              data-kt-element='send'
              onClick={sendMessage}
            >
              {t("HC.Button.SendFrom").toUpperCase()}
            </button> 
            <Dropdown style={{ marginLeft: "auto" }}>
              <Dropdown.Toggle
                className="btn btn-primary"
                type="button"
                data-kt-element="send"
                // style={{ border: "none" }}
                // className="bg-white align-text-bottom mr-0 ml-auto border-start-0 "
                id="send-dropdown"
                name={collabs?.lastInteractionChannel.toLowerCase()}
              >
                <span
                  className="symbol symbol-20px symbol-circle img"
                >
                  <img
                    className="symbol-label bg-primary h-10"
                    alt=""
                    src={toAbsoluteUrl(
                      `${channelIcon}${channel}.png`
                    )}
                  // style={{ backgroundColor: "#FFFFFF", }}
                  />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {collabs?.unreadMessages.length === 0 && collabs?.lastInteractionChannel !== undefined &&
                  <Dropdown.Item key={collabs.lastInteractionChannel} href="#" id="dropdown-send" style={{paddingLeft: "0px"}} name={collabs.lastInteractionChannel.toLowerCase()}>
                  {/* <Dropdown.Item href="#" onClick={sendMessage} id="dropdown-send" style={{paddingLeft: "0px"}} name={collabs.lastInteractionChannel.toLowerCase()}> */}
                  <span style={{paddingRight: "5px"}}>{t("HC.Button.SendFrom").toUpperCase()}</span>
                    <span className="symbol symbol-20px symbol-circle">
                      <img
                        className="symbol-label"
                        alt=""
                        src={toAbsoluteUrl(`${channelIcon}${collabs.lastInteractionChannel.toLowerCase()}.png`)}
                        style={{ backgroundColor: "#FFFFFF", }}
                      />
                    </span>
                  </Dropdown.Item>
                }
                {collabs !== undefined &&
                  collabs?.unreadMessages.map((activeChannel) =>
                    <Dropdown.Item key={activeChannel.channel} href="#" id="dropdown-send" name={activeChannel.channel.toLowerCase()} onClick={() => {setChannel(activeChannel.channel.toLowerCase())}}>
                      <span style={{paddingRight: "5px"}}>{t("HC.Button.SendFrom").toUpperCase()}</span>
                      <span className="symbol symbol-20px symbol-circle">
                        <img
                          className="symbol-label"
                          alt=""
                          src={toAbsoluteUrl(`/media/icons/channel/${activeChannel.channel.toString().toLowerCase()}.png`)}
                          style={{ backgroundColor: "#FFFFFF", }}
                        />
                      </span>
                    </Dropdown.Item>
                  )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(ChatInner);