import { FC, useState } from "react";
import {
  MessageModel,
  UserInfoModel,
  defaultUserInfos,
  toAbsoluteUrl,
} from "../../../../resources/helpers/";
import clsx from "clsx";
import {Users,Customer,Message as newMessageModel} from "../../../layout/chat/models/ChatItem.model"
import ChatTimeFromFirebase from "../components/ChatTime";
import '../../../../styles/css/color.css';

interface MessageProps {
  message: newMessageModel;
  isDrawer?: boolean;
  index: number;
  customer?: Customer;
  user?: Users;
}

const ChatMessage: FC<MessageProps> = (props) => {
  const { message, index, isDrawer, customer,user } = props;
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos);
  // const customer = message.customerModel;
  console.log('----------------------------------------------->> Masuk Chat Message');
  
  // const userInfo = userInfos[message.customerModel];
  const state = message.customerModel !== null ? "info" : "primary";
  const templateAttr = {};

  // if (message.template) {
  //   Object.defineProperty(templateAttr, "data-kt-element", {
  //     value: `template-${message.type}`,
  //   });
  // }
  let msgtype = "out";
  if(customer!=null){
    msgtype = "in";
  }
  
  let bgChat = "cl-"
  let txChat = "black"
  if (user!==undefined){
    bgChat="cl-7days"
  }else{
    bgChat+=message.channel.toString().toLowerCase();
    txChat = "white";
  }

  console.log("---------->> ini adalah bg chat : "+bgChat+" -- "+user); 

  const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
    msgtype === "in" ? "start" : "end"
  } mb-10`;
  
  return (
    <>
      {/* <div>
        <div>Avatar</div>
        <div>
          <div>Message</div>
          <div>Sent</div>
        </div>
      </div> */}

      {/* with classname & style */}
      <div
        key={`message${index}`}
        className={clsx("d-flex", contentClass, "mb-10", 
        // {
        //   "d-none": message.template,
        // }
        )}
        {...templateAttr}
      >
        {msgtype === "in" && (
          <div className="symbol  symbol-35px symbol-circle" style={{padding: "5px"}}>
            <img alt="Pic" src={toAbsoluteUrl(`/media/icons/channel/${message.channel.toString().toLowerCase()}.png`)} />
          </div>
        )}
        <div>
          <div
            className={clsx(
              "p-5 rounded",
              `${bgChat}`,
              // `bg-light-${state}`,
              // `bg-${state}`,
              // `bg-opacity-50`,
              "text-dark fw-bold mw-lg-400px",
              `text-${msgtype === "in" ? "start" : "end"}`
            )}
            // dangerouslySetInnerHTML={{ __html: message.textContent }}
          >
            <div style = {{color:txChat}} dangerouslySetInnerHTML={{ __html: message.textContent }}>
            </div>
          </div>
          <div
            className={clsx(
              "ms-3",
              `text-${msgtype === "in" ? "start" : "end"}`
            )}
          >
            <span className="text-muted fs-7 mb-1">{ChatTimeFromFirebase(message.createdAt.seconds)}</span>
          </div>
        </div>

        {msgtype !== "in" && (
          <div className="symbol  symbol-35px symbol-circle" style={{padding: "5px"}}>
            <img alt="Pic" src={toAbsoluteUrl(`/media/icons/channel/${message.channel.toString().toLowerCase()}.png`)} />
          </div>
        )}
      </div>

      {/* 

      <div
        key={`message${index}`}
        className={clsx("d-flex", contentClass, "mb-10", {
          "d-none": message.template,
        })}
        {...templateAttr}
      >
        <div
          className={clsx(
            "d-flex flex-column align-items",
            `align-items-${message.type === "in" ? "start" : "end"}`
          )}
        >
          <div
            className={clsx(
              "p-5 rounded",
              `bg-light-${state}`,
              "text-dark fw-bold mw-lg-400px",
              `text-${message.type === "in" ? "start" : "end"}`
            )}
            data-kt-element="message-text"
            dangerouslySetInnerHTML={{ __html: message.text }}
          ></div>

          <div className="d-flex align-items-center mb-2">
            {message.type === "in" ? (
              <>
                <div className="symbol  symbol-35px symbol-circle ">
                  <img
                    alt="Pic"
                    src={toAbsoluteUrl(`/media/${userInfo.avatar}`)}
                  />
                </div>
                <div className="ms-3">
                  <span className="text-muted fs-7 mb-1">{message.time}</span>
                </div>
              </>
            ) : (
              <>
                <div className="me-3">
                  <span className="text-muted fs-7 mb-1">{message.time}</span>
                </div>
                <div className="symbol  symbol-35px symbol-circle ">
                  <img
                    alt="Pic"
                    src={toAbsoluteUrl(`/media/${userInfo.avatar}`)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      */}
    </>
  );
};

export default ChatMessage;
