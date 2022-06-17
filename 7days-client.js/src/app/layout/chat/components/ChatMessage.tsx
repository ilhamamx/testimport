import { FC, useState } from "react";
import {
  MessageModel,
  UserInfoModel,
  defaultUserInfos,
  toAbsoluteUrl,
} from "../../../../resources/helpers/";
import clsx from "clsx";
import {
  User,
  Customer,
  Message as newMessageModel,
} from "../../../layout/chat/models/ChatItem.model";
import ChatTimeFromFirebase from "../components/ChatTime";
import "../../../../styles/css/color.css";

interface MessageProps {
  message: newMessageModel;
  isDrawer?: boolean;
  index: number;
  customer?: Customer;
  user?: User;
}

const ChatMessage: FC<MessageProps> = (props) => {
  const { message, index, isDrawer, customer, user } = props;
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos);
  // const customer = message.customerModel;
  console.log(
    "----------------------------------------------->> Masuk Chat Message"
  );

  // const userInfo = userInfos[message.customerModel];
  const state = message.customerModel !== null ? "info" : "primary";
  const templateAttr = {};

  // if (message.template) {
  //   Object.defineProperty(templateAttr, "data-kt-element", {
  //     value: `template-${message.type}`,
  //   });
  // }
  let msgtype = "out";
  if (customer != null) {
    msgtype = "in";
  }

  let bgChat = "cl-";
  let txChat = "black";
  if (user !== undefined) {
    bgChat = "cl-7days";
  } else {
    bgChat += message.channel.toString().toLowerCase();
    txChat = "white";
  }

  console.log("---------->> ini adalah bg chat : " + bgChat + " -- " + user);

  const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
    msgtype === "in" ? "start" : "end"
  } mb-10`;

  return (
      <div
        key={`message${index}`}
        className={clsx(
          "d-flex",
          contentClass,
          "mb-10"
        )}
        {...templateAttr}
      >
        {msgtype === "in" && (
          <div
            className="symbol  symbol-35px symbol-circle"
            style={{ padding: "5px" }}
          >
            <img
              alt="Pic"
              src={toAbsoluteUrl(
                `/media/icons/channel/${message.channel
                  .toString()
                  .toLowerCase()}.png`
              )}
            />
          </div>
        )}
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-end"
          >
            <div
              style={{ color: txChat }}
              dangerouslySetInnerHTML={{ __html: message.textContent }}
              className={clsx(
              "p-5 rounded",
              `${bgChat}`,
              "text-dark fw-bold mw-lg-400px",
            )}
            ></div>
          </div>
          <div
            className={clsx(
              "ms-3",
              `d-flex justify-content-${msgtype === "in" ? "start" : "end"}`
            )}
          >
            <span className="d-flex flex-row text-muted fs-7 mb-1" >
              {msgtype !== "in" && (
                <i
                  className="bi bi-check2-all"
                  style={{ paddingRight: "3px", paddingTop: "3px"}}
                ></i>
              )}
              {ChatTimeFromFirebase(message.createdAt.seconds)}
            </span>
          </div>
        </div>

        {msgtype !== "in" && (
          <div
            className="symbol  symbol-35px symbol-circle"
            style={{ padding: "5px" }}
          >
            <img
              alt="Pic"
              src={toAbsoluteUrl(
                `/media/icons/channel/${message.channel
                  .toString()
                  .toLowerCase()}.png`
              )}
            />
          </div>
        )}
      </div>
  );
};

export default ChatMessage;
