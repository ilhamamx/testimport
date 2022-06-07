import {HandledMessageListItem} from "../models/ChatItem.model";
import { Timestamp } from "../../../../db";



const lastActivity = (time: number) => {
    let timeMillis = Timestamp.now().toMillis();
  
    timeMillis = timeMillis - time;
    
    return Timestamp.fromMillis(timeMillis).toDate();
    
    // return Timestamp.fromMillis((Timestamp.now().toMillis()+time)).toDate();
  }

export const DUMMY_DATA: {}[] = [
  {
    id: "a1",
    fullName: "Brian Cox",
    image: "/media/avatars/300-25.jpg",
    lastMessages: "brian@exchange.com",
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
    lastMessages: "sean@dellito.com",
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
    lastMessages: "sean@dellito.com",
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
    lastMessages: "dam@consilting.com",
    unreadMessages: [],
    lastActivityAt: lastActivity(60000),
    // lastActivityAt: moment("20120620", "YYYYMMDD").fromNow().toString
  },
  {
    id: "a5",
    fullName: "Dan Wilson",
    image: "/media/avatars/300-23.jpg",
    lastMessages: "dam@consilting.com",
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
    lastMessages: "dam@consilting.com",
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
    lastMessages: "dam@consilting.com",
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
    lastMessages: "dam@consilting.com",
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