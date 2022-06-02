import { FC , useState} from "react";
import ChatItem from './ChatItem';

const DUMMY_DATA = [
  {
    id: 'a1',
    fullName: 'Melody Macy',
    image: '/media/avatars/300-5.jpg',
    mail: 'melody@altbox.com',
    unreadMessages: 4,
    lastActivity: '5 hours',
  },
  {
    id: 'a2',
    fullName: 'Sean Bead',
    image: '/media/avatars/300-5.jpg',
    mail: 'sean@dellito.com',
    unreadMessages: 5,
    lastActivity: '20 hours',
  },
  {
    id: 'a3',
    fullName: 'Melody Macy',
    image: '/media/avatars/300-5.jpg',
    mail: 'melody@altbox.com',
    unreadMessages: 4,
    lastActivity: '5 hours',
  },
  {
    id: 'a4',
    fullName: 'Sean Bead',
    image: '/media/avatars/300-5.jpg',
    mail: 'sean@dellito.com',
    unreadMessages: 5,
    lastActivity: '20 hours',
  },
];

const ChatList: FC = (props) => {

  const [handledMessageList, setHandledMessagesList] = useState(DUMMY_DATA);

  return (
    <div className='card-body pt-5' id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-5 h-200px h-lg-auto'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
              
            <ChatItem items={handledMessageList}/>
            </div>
          </div>
  );
}

export default ChatList;


      