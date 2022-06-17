import { FC } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../resources/helpers";
import { HandledMessageListItem } from "../models/ChatItem.model";
import {ChatTime} from "../components/ChatTime";
import { Timestamp } from "../../../../db";
import { ChatLastMessage } from "./ChatLastMessage";
import { format } from "timeago.js";

interface ChatItemProps {
  item: HandledMessageListItem;
  onOpenChat: (id: string) => void;
}

const lastActivity = (time: number) => {
  let timeMillis = Timestamp.now().toMillis();

  timeMillis = timeMillis - time * 1000;

  return Timestamp.fromMillis(time).toDate();
};

const ChatItem: FC<ChatItemProps> = (props) => {
  const { item } = props;
  const channelIcon = "/media/icons/channel/";
  const avatarIcon = "/media/icons/avatar/";
  // console.log("--->> customerModel : "+JSON.stringify(item.customerModel));
  // console.log("--->> User : "+JSON.stringify(item.userModel));
  return (
    <div
      className="d-flex flex-stack py-4 bg-active-secondary bg-hover-secondary cl-graywhite"
      style={{
        paddingLeft: "10px",
        paddingRight: "15px",
        paddingBottom: "15px",
        paddingTop: "15px",
      }}
      key={item.id}
      onClick={props.onOpenChat.bind(null, item.id)}
    >
      <div className="d-flex align-items-center">
        <div className="symbol symbol-45px symbol-circle">
          {item.customerModel?.avatar !== undefined &&
            <img
              alt="Pic"
              src={toAbsoluteUrl(`${item.customerModel?.avatar}`)}
            />
          }
          {item.customerModel?.avatar === undefined && (item.customerModel?.gender !== "female" || undefined) &&
            <img
              alt="Pic"
              src={toAbsoluteUrl(`${avatarIcon}m-avatar.png`)}
            />
          }
          {item.customerModel?.avatar === undefined && item.customerModel?.gender === "female" &&
            <img
              alt="Pic"
              src={toAbsoluteUrl(`${avatarIcon}f-avatar.png`)}
            />
          }



        </div>

        <div className="ms-5">
          <Link
            to="#"
            className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2"
            onClick={props.onOpenChat.bind(null, item.id)}
          >
            {item.customerModel?.firstName === undefined && `+${item.customerModel?.phoneNumber}`}
            {item.customerModel?.firstName !== undefined && item.customerModel?.firstName} {item.customerModel?.lastName}
          </Link>
          <div className="fw-bold text-gray-400">
            <ChatLastMessage
              lastmessage={item.lastInteractionMessage}
              lastmessagetype={item.lastInteractionType}
              id={item.id}
            />
            {/* {item.lastInteractionMessage} */}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end ms-2">
        <span className="text-muted fs-7 mb-1">
          {ChatTime(item.lastInteractionAt.toDate())}
          {/* format(new Date(item.lastInteractionAt.seconds*1000), "en_US") */}
        </span>
        <div className="symbol-group symbol-hover">
          {item.unreadMessages?.map(
            (unreadMessages) =>
              unreadMessages.unreadCount > 0 && (
                <span
                  className="symbol symbol-30px symbol-circle"
                  key={unreadMessages.channel}
                >
                  <img
                    className="symbol-label"
                    alt=""
                    src={toAbsoluteUrl(
                      `${channelIcon}${unreadMessages.channel.toLowerCase()}.png`
                    )}
                    style={{ backgroundColor: "#FFFFFF" }}
                  />
                  <span className="badge symbol-badge badge-sm badge-circle bg-success start-75">
                    {unreadMessages.unreadCount}
                  </span>
                </span>
              )
          )}
        </div>
      </div>

      <div className="separator separator-dashed d-none"></div>
    </div>
  );
};

export default ChatItem;
