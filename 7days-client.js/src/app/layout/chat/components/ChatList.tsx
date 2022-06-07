import { FC , useEffect, useState} from "react";
import ChatItem from "./ChatItem";
import {HandledMessageListItem} from "../models/ChatItem.model"
import { Timestamp } from "../../../../db";

import * as chat from "../../../modules/chat/redux/ChatSlice"

import { connect, ConnectedProps, useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import {RootState} from "../../../../setup/redux/store";

import * as Chat from "../../../../actions/chat";

// unreadCount: number,
//   className: string,
//   channel: string

const lastActivity = (time: number) => {
  let timeMillis = Timestamp.now().toMillis();

  timeMillis = timeMillis - time;
  
  return Timestamp.fromMillis(timeMillis).toDate();
  
  // return Timestamp.fromMillis((Timestamp.now().toMillis()+time)).toDate();
}

const mapState = (state: RootState) => ({ chat: state.Chat })
const connector = connect(mapState, chat.ChatSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>



const ChatList: FC<PropsFromRedux> = (props) => {

  //const [handledMessageList, setHandledMessagesList] = useState(DUMMY_DATA);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = {
      uid: "8BccV9T1R8huPSiJ9fGNway4yVD3",
      company: "cWt6gXnRGTFqL5TbYn6r"
    }

    Chat.fetchCollaborations(user.uid, user.company)
      .then(collabs => {
        dispatch(chat.setChatList(collabs))
      })

  

  },[dispatch]);

  
  /****/

  

  /****/
  // console.log("Check : "+JSON.stringify(collaborations));
  
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
              
            {
              props.chat.chatList.map((chatListItem) => {
                return <ChatItem item={chatListItem} key={chatListItem.id} />
              })
            }

            
            </div>
          </div>
  );
}


export default connector(ChatList);