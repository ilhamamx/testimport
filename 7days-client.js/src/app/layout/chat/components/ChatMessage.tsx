import { FC, useState } from "react";
import {
  MessageModel,
  UserInfoModel,
  defaultUserInfos,
  toAbsoluteUrl,
  getIconChannelUrl,
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

  // const userInfo = userInfos[message.customerModel];
  const state = message.customerModel !== null ? "info" : "primary";
  const templateAttr = {};

  let msgtype = "out";
  if (message.destination == "inbound") {
    msgtype = "in";
  }

  let bgChat = "cl-";
  let txChat = "black";
  if (msgtype !== "in") {
    bgChat = "cl-7days";
  } else {
    bgChat += message.channel.toString().toLowerCase();
    // sabunzone, tokopedia  : hitam
    if (
      message.channel.toString().toLowerCase() !== "sabunzone" &&
      message.channel.toString().toLowerCase() !== "tokopedia"
    ) {
      txChat = "white";
    }
  }

  const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
    msgtype === "in" ? "start" : "end"
  } mb-10`;

  return (
    <div
      key={`message${index}`}
      className={clsx("d-flex", contentClass, "mb-10")}
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
              getIconChannelUrl(message.channel.toLowerCase())
            )}
          />
        </div>
      )}

      <div className="d-flex flex-column">
        <div className="d-flex justify-content-end">
          {/* Message Type: Text */}
          {message.messageType === "text" && (
            <div
              style={{ color: txChat }}
              dangerouslySetInnerHTML={{ __html: message.textContent }}
              className={clsx(
                "p-5 rounded",
                `${bgChat}`,
                " fw-bold mw-lg-400px"
              )}
            ></div>
          )}

          {/* Message Type: Document */}
          {message.messageType === "document" && (
            <div className={clsx("p-5 rounded", `${bgChat}`, "d-flex flex-row align-items-center")}>
              <div className="bi bi-file-earmark-text fs-3x" style={{ color: txChat}}></div>
              <div style={{ paddingLeft: "5px", color: txChat}}>{message.textContent}</div>
              <div className="d-flex flex-column justify-content-end">
                <div className="bi bi-download fs-3 p-5" style={{ color: txChat }}></div>
                <div className="text-center">Size</div>
              </div>
            </div>
          )}

        </div>
        <div
          className={clsx(
            "ms-3",
            `d-flex justify-content-${msgtype === "in" ? "start" : "end"}`
          )}
        >
          <span className="d-flex flex-row text-muted fs-7 mb-1">
            {msgtype !== "in" && (
              <i
                className="bi bi-check2" // kalau read dia check2-all
                style={{ paddingRight: "3px", paddingTop: "3px" }}
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
