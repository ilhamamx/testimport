/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import clsx from "clsx";
import {
  defaultMessages,
  MessageModel,
  messageFromClient,
} from "../../../../resources/helpers/";
import ChatMessage from "./ChatMessage";
import { useTranslation } from "react-i18next";

type Props = {
  isDrawer?: boolean;
};

const bufferMessages = defaultMessages;

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

    bufferMessages.push(newMessage);
    setMessages(bufferMessages);
    toggleChatUpdateFlat(!chatUpdateFlag);
    setMessage("");
    setTimeout(() => {
      bufferMessages.push(messageFromClient);
      setMessages(() => bufferMessages);
      toggleChatUpdateFlat((flag) => !flag);
    }, 1000);
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
            {/* <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="tooltip"
              title="Coming soon"
            >
              <i className="bi bi-paperclip fs-3"></i>
            </button> */}
            <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="tooltip"
              title="Coming soon"
            >
              <i className="bi bi-upload text-custom fs-3"></i>
            </button>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            data-kt-element="send"
            onClick={sendMessage}
          >
            {t("Chat.Button.SendFrom").toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ChatInner };
