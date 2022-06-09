import { FC } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../resources/helpers";
import { HandledMessageListItem } from "../models/ChatItem.model";
import moment from "moment";
import {ChatTime} from "../ChatTime";

interface ChatItemProps {
  item: HandledMessageListItem;
  onOpenChat: (id:string) => void;
}

const ChatItem: FC<ChatItemProps> = (props) => {
  const { item } = props;
  const channelIcon = "/media/icons/channel/";

  return (
    <div className="d-flex flex-stack py-4" key={item.id}>
      <div className="d-flex align-items-center">
        <div className="symbol symbol-45px symbol-circle">
          <img alt="Pic" src={toAbsoluteUrl(`${item.customerModel?.avatar}`)} />
        </div>

        <div className="ms-5">
          <a
            href="#"
            className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2"
            // onClick={props.onOpenChat.bind(null,item.id)})}
          >
            {item.customerModel?.firstName} {item.customerModel?.lastName}
          </a>
          <div className="fw-bold text-gray-400">
            {item.lastInteractionMessage}
            {/* check message type + message */}
            
            </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end ms-2">
        <span className="text-muted fs-7 mb-1">
          {ChatTime(item.lastInteractionAt)}
        </span>
        <div className="symbol-group symbol-hover">
            {item.unreadMessages?.map((unreadMessage) => (
              <span
                className="symbol symbol-35px symbol-circle"
                key={unreadMessage.channel}
              >
                <img
                  className="symbol-label"
                  alt=""
                  src={toAbsoluteUrl(
                    `${channelIcon}${unreadMessage.channel.toLowerCase()}.png`
                  )}
                  style={{backgroundColor: "#FFFFFF", }}
                  />
                <span className="badge symbol-badge badge-sm badge-circle bg-success start-75">
                  {unreadMessage.unreadCount}
                </span>
              </span>
            ))}
        </div>
      </div>

      <div className="separator separator-dashed d-none"></div>
    </div>
  );
};

export default ChatItem;
