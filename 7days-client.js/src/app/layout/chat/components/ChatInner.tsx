/* eslint-disable jsx-a11y/anchor-is-valid */
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
  const collablist = useSelector((state: RootState) => state.Chat.chatList); //list Collaboration
  const [messages, setMessages] = useState<newMessageModel[]>([]); //List Message 
  const [channel, setChannel] = useState<string>(""); //Selected Channel or Last Interaction Channel
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] =useState<string>("");
  const [fileName, setFileName] =useState<string>("");
  const [mediaURL, setMediaURL] =useState<string|undefined>("");
  const [messageType, setmessageType] =useState<string|undefined>("text");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    // console.log("image effect : " + imgUrl)
    console.log("picture effect : " + picture)
    // setImgUrl(image)
  }, [picture]) 

  //Get Uploaded File
  const setPreviewFile = async (event: any) => {
    console.log("Panggil function"+event.target.files[0]);
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      //Set File Attribut
      const size: number = event.target.files[0].size;
      // React.useCallback()
      setPicture(URL.createObjectURL(event.target.files[0]));
      setFileName(event.target.files[0].name);
      setFileSize(await formatSize(size));

      
      //Check File Type 
      const tempArrFileType:string = event.target.files[0].type;
      const arryFileType = tempArrFileType.split("/")
      console.log("---->>> File type : "+tempArrFileType);
      console.log("---->>> arr File type : "+arryFileType);
      if(arryFileType===undefined || arryFileType.length < 1 || arryFileType[0]=== undefined){
        //return error
        alert("Invalid File Type, Please check your file");
      }else{
        setmessageType(await checkFile(arryFileType[0]));
      } 

      console.log("---->>> File URL ori: "+URL.createObjectURL(event.target.files[0]));
      console.log("---->>> File type ori: "+event.target.files[0].type);
      console.log("---->>> File Name ori: "+event.target.files[0].name);
      console.log("---->>> File Size ori: "+event.target.files[0].Size);
      console.log("---->>> File Size ori: "+await formatSize(size));
      console.log("---->>> File ori: "+event.target.files[0]);
      console.log("---->>> File type : "+messageType);
      console.log("---->>> File Name : "+fileName);
      console.log("---->>> File Size : "+fileSize);
      console.log("---->>> File : "+file);
    } 
  }

  // useEffect(async () => {
  //   console.log("ISI FIle : "+file);
  //   if(file){
  //     //Set File Attribut
  //     const size: number = file.size;
  //     // React.useCallback()
  //     setPicture(URL.createObjectURL(file));
  //     setFileName(File.name);
  //     setFileSize(await formatSize(size));

      
  //     //Check File Type 
  //     const tempArrFileType:string = file.type;
  //     const arryFileType = tempArrFileType.split("/")
  //     console.log("---->>> File type : "+tempArrFileType);
  //     console.log("---->>> arr File type : "+arryFileType);
  //     if(arryFileType===undefined || arryFileType.length < 1 || arryFileType[0]=== undefined){
  //       //return error
  //       alert("Invalid File Type, Please check your file");
  //     }else{
  //       setmessageType(await checkFile(arryFileType[0]));
  //     } 

  //     console.log("---->>> File URL ori: "+URL.createObjectURL(file));
  //     console.log("---->>> File type ori: "+file.type);
  //     console.log("---->>> File Name ori: "+file.name);
  //     console.log("---->>> File Size ori: "+file.Size);
  //     console.log("---->>> File Size ori: "+await formatSize(size));
  //     console.log("---->>> File ori: "+file);
  //     console.log("---->>> File type : "+messageType);
  //     console.log("---->>> File Name : "+fileName);
  //     console.log("---->>> File Size : "+fileSize);
  //     console.log("---->>> File : "+file);
  //   }
  // },[File])

  //Upload File To Storage
  const uploadFile = async (companyID : string) => {
    console.log("---->>> File ...... : "+file);
    let fileURL = '';
    if (file !== null ) {
      // setPicture(event.target.files[0])
      console.log("file data avatar ===>>>"+file);
      const uuid = uuidv4()
      const task = storage
        .ref(companyID+"/"+messageType+"/chat/sent")
        .child(uuid)
        .put(file);
      await task
        .then(async(snapshot) => {
          return storage
            .ref(companyID+"/"+messageType+"/chat/sent")
            .child(uuid)
            .getDownloadURL()
            .then((url) => {
              console.log("media url : " + url);
              // setImgUrl(url);
              fileURL = url;
              // image = url;
            // document.querySelector("#image").src = url;
            });
        })
        .catch((error) => {
          console.log("error : " + error.message);
        });
        
    }
    return fileURL 
  }

  useEffect(() => {
    // tambah untuk manggil function di action account -> di dalam action account terdapat process untuk check account di redux, jika 
    // di redux ada ambil dari redux, jika gada ambil dari firebase.
    
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
    if(messageType !== "text"){
      setMediaURL(await Promise.resolve(uploadFile(companyID)));
    }
    console.log("ISI Media URL : "+mediaURL);

    //Create New Message Model
    const newMessage: newMessageModel = {
      channel: channel,
      createdAt: Timestamp.now(),
      destination: "outbound",
      customer: collabs?.customer,
      user: collabs?.toUser,
      mediaUrl: mediaURL,
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

    const setNewMessage = (newMessage: newMessageModel) => {
      //Set New Message To List Message
      setMessages(prevMessage => [
        ...prevMessage,newMessage]); 
    }

    const onFetchAccountFinished = (accountChat: Account|undefined) => {
      if(accountChat){
        setNewMessage(newMessage);
        //Save New Message To Redux
        dispatch(chat.setListMessages(messages));
        
        //Save New Message to Firebase
        Chat.createCollaborationMessage(newMessage, companyID ,selectedChat, accountChat, customerChat);
        // Chat.createCollaborationMessage(newMessage, selectedChat, undefined, undefined);
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
              title={t("Chat.Button.AttachFile")}
            >
              <i className="bi bi-upload text-custom fs-1 p-5"></i>

              <input id="contact-avatar" onChange={setPreviewFile} type="file" name="avatar"/> 
              {/* accept=".png, .jpg, .jpeg" /> */}
            </label>
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