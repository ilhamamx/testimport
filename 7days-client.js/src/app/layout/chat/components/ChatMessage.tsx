import { FC, useEffect, useState } from "react";
import {
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
import { saveMessageMedia } from "../../../../actions/chat";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { url } from "inspector";
import { ChatFileView } from "./ChatFileView";
import { Modal, ModalDialog } from "react-bootstrap";
import { useDispatch } from "react-redux";

interface MessageProps {
  message: newMessageModel;
  isDrawer?: boolean;
  index: number;
  customer?: Customer;
  user?: User;
  messages: newMessageModel[];
}

const ChatMessage: FC<MessageProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { message, index, isDrawer, customer, user, messages } = props;
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos);
  // const customer = message.customerModel;
  const [previousMedia, setPreviousMedia] =useState<string>("");
  const [nextMedia, setNextMedia] =useState<string>("");
  const [currentMedia, setCurrentMedia] =useState<string>(`kt_modal_${message.messageType}_${message.id}`);
  let listMediaUrl: string[] = []; 

  useEffect(() => {
    messages.forEach((obj) => {
      if(obj.messageType!== undefined && (obj.messageType === "video" || obj.messageType === "image")){
        listMediaUrl.push(`kt_modal_${obj.messageType}_${obj.id}`);
      }
    });
  
    for (let index = 0; index < listMediaUrl.length; index++) {
      if (listMediaUrl[index] === currentMedia ) {
         setNextMedia(listMediaUrl[index+1]);
         setPreviousMedia(listMediaUrl[index-1]);
      }
    }
  },[]);

  // const userInfo = userInfos[message.customerModel];
  const state = message.customerModel !== null ? "info" : "primary";
  const templateAttr = {};

  let mediaFileName = message.filename;
  if (mediaFileName && mediaFileName?.length > 35) {
    mediaFileName = mediaFileName?.substring(0, 35) + "...";
  }

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

  const saveMedia = () => {
    console.log(
      "check Isi Variable : " + message.mediaUrl + " --- " + message.filename
    );
    if (message.mediaUrl && message.filename) {
      return saveMessageMedia(message.mediaUrl, message.filename);
    } else {
      return alert(t("HC.Error.FailedUpload"));
    }
  };

  const openDialog = () => {
    if (
      message.mediaUrl !== undefined &&
      message.id !== undefined &&
      message.messageType !== undefined
    ) {
      // <ChatFileView />
      console.log("Clicked : " + message.mediaUrl + " --- " + message.id);
    }
  };

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
            <div
              className={clsx(
                "p-2 rounded",
                `${bgChat}`,
                "d-flex flex-column",
                "mw-lg-400px"
              )}
            >
              <div
                className={clsx(
                  "p-2 rounded",
                  `${bgChat}`,
                  "d-flex flex-row align-items-center bg-opacity-25"
                )}
                title={message.filename}
              >
                <div
                  className="bi bi-file-earmark-text fs-3x"
                  style={{ color: txChat }}
                ></div>
                <div
                  className="container-sm"
                  style={{ paddingLeft: "5px", color: txChat }}
                >
                  {mediaFileName}
                </div>
                <div
                  className="d-flex flex-column justify-content-end"
                  style={{ width: "70px" }}
                >
                  <div
                    className="btn bi bi-download fs-3"
                    onClick={saveMedia}
                    style={{
                      color: txChat,
                      paddingTop: "5px",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      paddingBottom: "0px",
                    }}
                  ></div>
                  <div
                    className="text-center"
                    style={{ fontSize: "10px", color: txChat }}
                  >
                    {message.filesize}
                  </div>
                </div>
              </div>
              {message.textContent && message.textContent !== "" && (
                <div
                  className={clsx(
                    "p-3 rounded",
                    `${bgChat}`,
                    "fluid align-items-center"
                  )}
                  style={{ color: txChat }}
                >
                  {message.textContent}
                </div>
              )}
            </div>
          )}

          {/* Message Type: Image */}
          {console.log("ModalID: kt_modal_"+message.messageType+"_"+message.id)}
          {(message.messageType === "image" ||
            message.messageType === "video") && (
            //bubble chat
            <div
              className={clsx("p-2 rounded", `${bgChat}`, "d-flex flex-column")}
            >
              {message.messageType === "image" && (
                <div
                  className="image-input bg-opacity-25 mw-lg-300px"
                  data-kt-image-input="true"
                  data-bs-toggle="modal"
                  data-bs-target={`#kt_modal_${message.messageType}_${message.id}`}
                  // onClick={openDialog}
                >
                  {/* begin::Preview existing avatar */}
                  <div
                    className="image-input-wrapper w-300px"
                    style={{
                      backgroundImage: `url('${message.mediaUrl}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  {/* end::Preview existing avatar */}
                </div>
              )}
              {message.messageType === "video" && (
                <div
                  className="image-input mw-lg-300px"
                  data-kt-image-input="true"
                  data-bs-toggle="modal"
                  data-bs-target={`#kt_modal_${message.messageType}_${message.id}`}
                >
                  {/* begin::Preview existing video */}
                  <div
                    className="btn bi bi-play-circle fs-5x w-300px position-absolute top-50 start-50 translate-middle"
                    style={{ color: "white", zIndex: 999 }}
                  ></div>
                  <video
                    className="w-300px"
                    src={message.mediaUrl}
                    style={{ borderRadius: "8px" }}
                  ></video>
                  {/* end::Preview existing video */}
                </div>
              )}
              {/***
               * Caption
               */}
              {message.filename && message.filename !== "" && (
                <div
                  className={clsx(
                    "p-3 rounded",
                    `${bgChat}`,
                    "fluid align-items-center"
                  )}
                  style={{ color: txChat }}
                >
                  {message.filename}
                </div>
              )}
              {/***
               * End Of Caption
               */}
               
              {message.mediaUrl !== undefined &&
                message.id !== undefined &&
                message.filename !== undefined && (
                  <ChatFileView
                  messageType={message.messageType}
                  mediaURL={message.mediaUrl}
                  messageId={message.id}
                  mediaName={message.filename}
                  previousMedia={previousMedia}
                  nextMedia={nextMedia}
                  currentMedia={currentMedia}                    
                  />
                )}
            </div>
            //End Of Bubble chat
          )}


          {/* Message Type: Audio */}

          {/* Message Type: Location */}
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
