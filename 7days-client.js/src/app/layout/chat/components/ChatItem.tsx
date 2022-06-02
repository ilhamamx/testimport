import { FC } from "react";
import { toAbsoluteUrl } from '../../../../resources/helpers';

interface HandledMessagesListProps {
  items: {
    id: string;
    fullName: string;
    image: string;
    mail: string;
    unreadMessages: number;
    lastActivity: string;
  }[]
}

const ChatItem: FC<HandledMessagesListProps> = (props) => {
    return(
      <div>
      {props.items.map((handledMessage) => (
        <div className='d-flex flex-stack py-4'>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-45px symbol-circle'>
            <img alt='Pic' src={toAbsoluteUrl(`${handledMessage.image}`)} />
          </div>
  
          <div className='ms-5'>
            <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>{handledMessage.fullName}</a>
            <div className='fw-bold text-gray-400'>{handledMessage.mail}</div>
          </div>
        </div>
  
        <div className='d-flex flex-column align-items-end ms-2'>
          <span className='text-muted fs-7 mb-1'>{handledMessage.lastActivity}</span>
          <span className='badge badge-sm badge-circle badge-light-success'>{handledMessage.unreadMessages}</span>
        </div>
        
        <div className='separator separator-dashed d-none'></div>
      </div>
      ))}
      </div>
    );
}

export default ChatItem;