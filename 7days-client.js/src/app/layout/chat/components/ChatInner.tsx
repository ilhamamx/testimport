/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import clsx from "clsx";
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
import { useSelector } from "react-redux";

type Props = {
  isDrawer?: boolean;
};

const bufferMessages = defaultMessages;// ganti dengan get message dari firebase, dan 

// Noted : luar chat : 
// 1. klik chat list
// 2. panggil finction, update reduct Selected Chat (berisi semua data message)
// 3. di chatinner di tambahkan use effect yang akan melakukan process ketika selected chat di ganti 


const ChatInner: FC<Props> = ({ isDrawer = false }) => {
  const { t } = useTranslation();

  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageModel[]>(bufferMessages);

  const sendMessage = () => {
    const newMessage: MessageModel = {
      user: 2,
      type: "out",
      text: message,
      time: "Just now",
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
        {messages.map((message, index) => {
          return (
            <ChatMessage
              message={message}
              key={index}
              index={index}
              isDrawer={isDrawer}
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

          <div className="d-flex align-items-center me-2">
            {/* <button
              className="btn btn-primary"
              type="button"
              data-kt-element="send"
              onClick={sendMessage}
            >
              {t("Chat.Button.SendFrom").toUpperCase()}
            </button> */}

            {/* Coba Dropdown */}

            <Dropdown style={{ marginLeft: "auto" }}>
              <Dropdown.Toggle
                className="btn btn-primary"
                type="button"
                data-kt-element="send"
                // style={{ border: "none" }}
                // className="bg-white align-text-bottom mr-0 ml-auto border-start-0 "
                id="send-dropdown"
              >
                {/* Label */}
                <label>{t("Chat.Button.SendFrom").toUpperCase()}</label>
                {/* Channel Logo */}
                <span
                  className="symbol symbol-5px symbol-circle"
                >
                  <img
                    className="symbol-label bg-primary"
                    alt=""
                    src={toAbsoluteUrl(`/media/icons/channel/whatsapp.png`)}
                    // style={{ backgroundColor: "#FFFFFF", }}
                  />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* maps customer channel, jangan lupa default nya lastInteractionChannel */}
                <Dropdown.Item
                  href="#"
                  onClick={sendMessage}
                  id="dropdown-logout"
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChatInner };
