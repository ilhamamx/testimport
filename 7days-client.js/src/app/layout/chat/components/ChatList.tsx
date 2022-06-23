import { FC , useEffect, useState} from "react";
import { connect, ConnectedProps, useDispatch , useSelector} from "react-redux";
import ChatItem from "./ChatItem";
import * as chat from "../../../modules/chat/redux/ChatSlice";
import {RootState} from "../../../../setup/redux/store";
import * as Chat from "../../../../actions/chat";
import * as lc from '../../../modules/localstorage/index'

const mapState = (state: RootState) => ({ chat: state.Chat })
const connector = connect(mapState, chat.ChatSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const ChatList: FC<PropsFromRedux> = (props) => {

  const dispatch = useDispatch();

  const chatOpenHandler = (id: string) => {
    dispatch(chat.setSelectedChat(id));
  }
  

  useEffect(() => {
    let userSessionToken = lc.getItemLC(lc.LCName.SessionToken);
    const currentUser = lc.getItemLC(lc.LCName.User);
    
    const user = {
      // uid: "8BccV9T1R8huPSiJ9fGNway4yVD3",
      company: lc.getItemLC(lc.LCName.CompanyID),
      uid: currentUser.uid,
      // company: currentUser.company
    }

    Chat
      .fetchCollaborations(user.uid, user.company)
      .then(collabs => dispatch(chat.setChatList(collabs)))
    
  },[]);
  
  return (
    <div className="card-body pt-5" id="kt_chat_contacts_body">
            <div
              className="scroll-y me-n5 pe-5 h-550px"
              //  h-lg-auto"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
              data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
              data-kt-scroll-offset="0px"
              data-kt-scroll-change-pos
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