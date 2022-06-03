import { FC } from "react";
import { toAbsoluteUrl } from '../../../../resources/helpers';
import { HandledMessageListItem } from "../models/ChatItem.model";
import moment from "moment";

interface ChatItemProps {
  item: HandledMessageListItem,

}

const ChatItem: FC<ChatItemProps> = (props) => {

    const { item } = props;

    return(
        <div className='d-flex flex-stack py-4' key={item.id}>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-45px symbol-circle'>
              <img alt='Pic' src={toAbsoluteUrl(`${item.image}`)} />
              {/* <img alt='Pic' src={item.image} /> */}
            </div>
    
            <div className='ms-5'>
              <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                {item.fullName}</a>
              <div className='fw-bold text-gray-400'>{item.mail}</div>
            </div>
          </div>
  
          <div className='d-flex flex-column align-items-end ms-2'>
            <span className='text-muted fs-7 mb-1'>{moment(item.lastActivityAt).fromNow().toString()}</span>
            <div>
              {item.unreadMessages?.map((unreadMessage) =>
                <span className={`badge badge-sm badge-circle ${unreadMessage.className}`} key={unreadMessage.channel}>{unreadMessage.unreadCount}</span>
              )}
            </div>
          </div>
        
        <div className='separator separator-dashed d-none'></div>
      </div>
      
    );
}

export default ChatItem;