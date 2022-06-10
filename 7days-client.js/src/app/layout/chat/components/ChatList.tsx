import { FC , useEffect, useState} from "react";
import { connect, ConnectedProps, useDispatch , useSelector} from "react-redux";
import ChatItem from "./ChatItem";
import * as chat from "../../../modules/chat/redux/ChatSlice";
import {RootState} from "../../../../setup/redux/store";
import * as Chat from "../../../../actions/chat";

const mapState = (state: RootState) => ({ chat: state.Chat })
const connector = connect(mapState, chat.ChatSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const ChatList: FC<PropsFromRedux> = (props) => {

  const dispatch = useDispatch();

  const chatOpenHandler = (id: string) => {
    console.log("Chat clicked >> "+id)
  }

  useEffect(() => {
    const user = {
      uid: "8BccV9T1R8huPSiJ9fGNway4yVD3",
      company: "cWt6gXnRGTFqL5TbYn6r"
    }

    Chat
      .fetchCollaborations(user.uid, user.company)
      .then(collabs => dispatch(chat.setChatList(collabs)))
    
  },[]);
  
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
                return <ChatItem item={chatListItem} key={chatListItem.id} onOpenChat={chatOpenHandler}/>
              })
            }
      </div>
    </div>
  );
}


export default connector(ChatList);