import { FC, useState } from "react";
import {
  MessageModel,
  UserInfoModel,
  defaultUserInfos,
  toAbsoluteUrl,
} from "../../../../resources/helpers/";
import clsx from "clsx";

interface MessageProps {
  message: MessageModel;
  isDrawer?: boolean;
  index: number;
}

const ChatMessage: FC<MessageProps> = (props) => {
  const { message, index, isDrawer } = props;
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos);

  const userInfo = userInfos[message.user];
  const state = message.type === "in" ? "info" : "primary";
  const templateAttr = {};

  if (message.template) {
    Object.defineProperty(templateAttr, "data-kt-element", {
      value: `template-${message.type}`,
    });
  }
  const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
    message.type === "in" ? "start" : "end"
  } mb-10`;

  return (
    <>
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
                  <a
                    href="#"
                    className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1"
                  >
                    {userInfo.name}
                  </a>
                  <span className="text-muted fs-7 mb-1">{message.time}</span>
                </div>
              </>
            ) : (
              <>
                <div className="me-3">
                  <span className="text-muted fs-7 mb-1">{message.time}</span>
                  <a
                    href="#"
                    className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1"
                  >
                    You
                  </a>
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
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
