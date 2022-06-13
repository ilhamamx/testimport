/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import * as Chat from "../../../../actions/chat";
import {
  defaultMessages,
  MessageModel,
  messageFromClient,
  toAbsoluteUrl,
} from "../../../../resources/helpers/";
import ChatMessage from "./ChatMessage";
import { useTranslation } from "react-i18next";
import { DropdownDefault } from "../../dropdown/DropdownDefault"
import { Dropdown } from "react-bootstrap";
import { RootState } from '../../../../setup/redux/store'
import * as chat from "../../../modules/chat/redux/ChatSlice";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import * as reduxmessage from "../../../modules/chat/redux/ChatSlice";
// import { } from "../../../../../../../app/layout/chat/models/ChatItem.model"
import { Message as newMessageModel } from "../../../layout/chat/models/ChatItem.model"
import { Timestamp } from "../../../../db";

const capitalizeLetter = (letter: string) => {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

const mapState = (state: RootState) => ({ chat: state.Chat })
const connector = connect(mapState, chat.ChatSlice.actions)

type Props = {
  isDrawer?: boolean,
  propsredux?: ConnectedProps<typeof connector>
};

// const bufferMessages = defaultMessages;// ganti dengan get message dari firebase, dan 

const ChatInner: FC<Props> = ({ isDrawer = false }, props) => {
  const { t } = useTranslation();
  const channelIcon = "/media/icons/channel/"

  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const dispatch = useDispatch();
  const selectedChat = useSelector((state: RootState) => state.Chat.selectedChat);

  useEffect(() => {
    console.log("Selected chat : " + selectedChat);
    console.log("hasil chat : " + Chat.fetchMessageCollaboration(selectedChat));
    Chat
      .fetchMessageCollaboration(selectedChat)
      .then(newMessage => dispatch(reduxmessage.setListMessages(newMessage)))
  }, [selectedChat]);

  const bufferMessages = useSelector((state: RootState) => state.Chat.listMessage);
  console.log("--->> Pesan dari redux : " + JSON.stringify(bufferMessages));
  let [messages, setMessages] = useState<newMessageModel[]>(bufferMessages);
  useEffect(() => {
    setMessages(bufferMessages);
  }, bufferMessages);
  // setMessages(bufferMessages);

  const collabls = useSelector((state: RootState) => state.Chat.chatList);
  const collabs = collabls.find(obj => {
    return obj.id === selectedChat
  });

  const sendMessage = () => {
    const newMessage: newMessageModel = {
      channel: "whatsapp",
      textContent: message,
      // lastInteractionAt: Timestamp.fromDate(new Date())
      createdAt: Timestamp.fromDate(new Date()),
      // createdAt: {
      //   seconds: 0,
      //   nanoseconds: new Date().getTime()
      // },
      messageType: "",
      updatedAt: {
        seconds: 0,
        nanoseconds: new Date().getTime()
      },
      id: ""
    };

    bufferMessages.push(newMessage);// tambahkan pesan baru
    setMessages(bufferMessages); //set varibale message dengan array buffered message yang sudah di rambahkan chat baru
    toggleChatUpdateFlat(!chatUpdateFlag);
    setMessage("");//message kembalid di kosongkan setelah di tambahkan ke list chat
    /***
     * Untuk Balasan pesan
     */
    // setTimeout(() => {
    //   bufferMessages.push(messageFromClient);
    //   setMessages(() => bufferMessages);
    //   toggleChatUpdateFlat((flag) => !flag);
    // }, 1000);
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
          "h-300px h-lg-auto": !isDrawer,
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
        {bufferMessages.map((message, index) => {
          // console.log("------------>> cs model map chat : " + JSON.stringify(message.customerModel) + " --- " + index);
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
            <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="tooltip"
              title="Coming soon"
            >
              <i className="bi bi-upload text-custom fs-3"></i>
            </button>
          </div>

          <div className="d-flex align-items-center me-2 bg-primary">
            <button
              className='btn btn-primary'
              type='button'
              data-kt-element='send'
              onClick={alert}
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
              >
                <span
                  className="symbol symbol-20px symbol-circle img"
                >
                  <img
                    className="symbol-label bg-primary h-10"
                    alt=""
                    src={toAbsoluteUrl(
                      `${channelIcon}${collabs?.lastInteractionChannel.toLowerCase()}.png`
                    )}
                  // style={{ backgroundColor: "#FFFFFF", }}
                  />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {collabs?.unreadMessages.length === 0 && collabs?.lastInteractionChannel !== undefined &&
                  <Dropdown.Item href="#" onClick={sendMessage} id="dropdown-send" style={{paddingLeft: "0px"}}>
                    <span className="symbol symbol-20px symbol-circle">
                      <img
                        className="symbol-label"
                        alt=""
                        src={toAbsoluteUrl(`${channelIcon}${collabs.lastInteractionChannel.toLowerCase()}.png`)}
                        style={{ backgroundColor: "#FFFFFF", }}
                      />
                    </span>
                    <span style={{padding: "5px"}}>{capitalizeLetter(collabs.lastInteractionChannel)}</span>
                  </Dropdown.Item>
                }
                {collabs !== undefined &&
                  collabs?.unreadMessages.map((activeChannel) =>
                    <Dropdown.Item href="#" onClick={sendMessage} id="dropdown-send">
                      <span className="symbol symbol-20px symbol-circle">
                        <img
                          className="symbol-label"
                          alt=""
                          src={toAbsoluteUrl(`/media/icons/channel/${activeChannel.channel.toString().toLowerCase()}.png`)}
                          style={{ backgroundColor: "#FFFFFF", }}
                        />
                      </span>
                      <span style={{padding: "5px"}}>{capitalizeLetter(activeChannel.channel)}</span>
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
// export { ChatInner };

// const test: Array<newMessageModel> = [
//   {
//     channel: "whatsapp",
//     textContent: "halo",
//     createdAt: new Date(),
//     messageType: "text",
//     updatedAt: new Date(),
//     id: "2"
//   },
//   {
//     channel: "whatsapp",
//       textContent: "message",
//       createdAt: new Date(),
//       messageType: "text",
//       updatedAt: new Date(),
//       id: "1"
//   }]