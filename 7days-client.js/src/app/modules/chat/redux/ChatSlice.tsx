import InitialState, { UpdateChatListAction } from "./ChatRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HandledMessageListItem,Message } from "../../../layout/chat/models/ChatItem.model";
import firebase from 'firebase/compat/app';
import { Timestamp } from "../../../../db";

const initialState: InitialState = {
  chatList: [],
  selectedCollaboration: {
    id: "",
    fullName: "",
    image: "",
    lastMessages: "",
    unreadMessages: [],
    lastInteractionAt: Timestamp.fromDate(new Date()),
    lastInteractionChannel: "",
    lastInteractionType: "",
    lastInteractionMessage: "",
    customer: undefined,
    customerModel: undefined,
    LastMessageModel: undefined,
  },
  listMessage:[],
};

export const ChatSlice = createSlice({
  name: UpdateChatListAction,
  initialState: initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<HandledMessageListItem[]>) => {
      state.chatList = action.payload;
      console.log(action.payload)
    },
    setSelectedCollaboration: (state, action: PayloadAction<HandledMessageListItem>) => {
      state.selectedCollaboration = action.payload;
      console.log(action.payload)
    },
    setListMessages: (state, action: PayloadAction<Message[]>) => {
      state.listMessage = action.payload;
      console.log(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatList, setSelectedCollaboration, setListMessages } =
ChatSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default ChatSlice.reducer;
