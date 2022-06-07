import { FC , useState} from "react";
import ChatItem from "./ChatItem";
import {HandledMessageListItem} from "../models/ChatItem.model"
import { Timestamp } from "../../../../db";

import { useSelector } from "react-redux";
import {RootState} from "../../../../setup/redux/store";

import * as Collaborations from "../../../../db/serviceCollaborations";

// unreadCount: number,
//   className: string,
//   channel: string

const lastActivity = (time: number) => {
  let timeMillis = Timestamp.now().toMillis();

  timeMillis = timeMillis - time;
  
  return Timestamp.fromMillis(timeMillis).toDate();
  
  // return Timestamp.fromMillis((Timestamp.now().toMillis()+time)).toDate();
}

const DUMMY_DATA: HandledMessageListItem[] = [
  {
    id: "a1",
    fullName: "Brian Cox",
    image: "/media/avatars/300-25.jpg",
    mail: "brian@exchange.com",
    unreadMessages: [
      {
        unreadCount: 4,
        className: "badge-light-success",
        channel: "Tokopedia"
      },
      {
        unreadCount: 3,
        className: "badge-light-warning",
        channel: "Shopee"
      }
    ],
    lastActivityAt: lastActivity(300),
  },
  {
    id: "a2",
    fullName: "Sean Bean",
    image: "/media/avatars/300-5.jpg",
    mail: "sean@dellito.com",
    unreadMessages: [
      {
        unreadCount: 2,
        className: "badge-light-warning",
        channel: "Shopee"
      },
      {
        unreadCount: 4,
        className: "badge-light-warning",
        channel: "Blibli"
      },
      {
        unreadCount: 2,
        className: "badge-light-warning",
        channel: "Whatsapp"
      }
    ],
    lastActivityAt: lastActivity(360000000),
  },
  {
    id: "a3",
    fullName: "Max Smith",
    image: "/media/avatars/300-1.jpg",
    mail: "sean@dellito.com",
    unreadMessages: [
      {
        unreadCount: 1,
        className: "badge-light-warning",
        channel: "Sabunzone"
      }
    ],
    lastActivityAt: lastActivity(3600000),
  },
  {
    id: "a4",
    fullName: "Dan Wilson",
    image: "/media/avatars/300-23.jpg",
    mail: "dam@consilting.com",
    unreadMessages: [],
    lastActivityAt: lastActivity(60000),
    // lastActivityAt: moment("20120620", "YYYYMMDD").fromNow().toString
  },
  {
    id: "a5",
    fullName: "Dan Wilson",
    image: "/media/avatars/300-23.jpg",
    mail: "dam@consilting.com",
    unreadMessages: [
      {
        unreadCount: 2,
        className: "badge-light-warning",
        channel: "Whatsapp"
      }
    ],
    lastActivityAt: lastActivity(60000),
    // lastActivityAt: moment("20120620", "YYYYMMDD").fromNow().toString
  },
  {
    id: "a6",
    fullName: "Dan Wilson",
    image: "/media/avatars/300-23.jpg",
    mail: "dam@consilting.com",
    unreadMessages: [
      {
        unreadCount: 3,
        className: "badge-light-warning",
        channel: "Shopee"
      },
      {
        unreadCount: 4,
        className: "badge-light-warning",
        channel: "Blibli"
      },
      {
        unreadCount: 4,
        className: "badge-light-success",
        channel: "Tokopedia"
      },
      {
        unreadCount: 2,
        className: "badge-light-warning",
        channel: "Whatsapp"
      }
    ],
    lastActivityAt: lastActivity(60000),
    // lastActivityAt: moment("20120620", "YYYYMMDD").fromNow().toString
  },
  {
    id: "a7",
    fullName: "Dan Wilson",
    image: "/media/avatars/300-23.jpg",
    mail: "dam@consilting.com",
    unreadMessages: [
      {
        unreadCount: 3,
        className: "badge-light-warning",
        channel: "Whatsapp"
      },
      {
        unreadCount: 4,
        className: "badge-light-success",
        channel: "Tokopedia"
      },
      {
        unreadCount: 2,
        className: "badge-light-warning",
        channel: "Shopee"
      }
    ],
    lastActivityAt: lastActivity(60000),
    // lastActivityAt: moment("20120620", "YYYYMMDD").fromNow().toString
  },
  {
    id: "a8",
    fullName: "Dan Wilson",
    image: "/media/avatars/300-23.jpg",
    mail: "dam@consilting.com",
    unreadMessages: [
      {
        unreadCount: 3,
        className: "badge-light-warning",
        channel: "Tokopedia"
      },
      {
        unreadCount: 4,
        className: "badge-light-success",
        channel: "Whatsapp"
      },
      {
        unreadCount: 2,
        className: "badge-light-warning",
        channel: "Shopee"
      },
      {
        unreadCount: 1,
        className: "badge-light-warning",
        channel: "Sabunzone"
      }
    ],
    lastActivityAt: lastActivity(60000),
  }
];

const ChatList: FC = (props) => {

  const [handledMessageList, setHandledMessagesList] = useState(DUMMY_DATA);

  const user = {
    uid: "8BccV9T1R8huPSiJ9fGNway4yVD3",
    company: "cWt6gXnRGTFqL5TbYn6r"
  }

  console.log("Get Data"+Collaborations.fetchCollaborationsByUser(user.uid,user.company));
  
  
  return (
    <div className="card-body pt-5" id="kt_chat_contacts_body">
            <div
              className="scroll-y me-n5 pe-5 h-200px h-lg-auto"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
              data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
              data-kt-scroll-offset="0px"
            >
              
            {handledMessageList.map((handledMessage) => 
              <ChatItem item={handledMessage} key={handledMessage.id}/>
            )}

            
            </div>
          </div>
  );
}

export default ChatList; 