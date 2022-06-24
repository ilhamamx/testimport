import InitialState, { UpdateChatListAction } from "./ChatRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  HandledMessageListItem,
  Message,
} from "../../../layout/chat/models/ChatItem.model";
import { Timestamp } from "../../../../db";
import * as lc from "../../localstorage/index"

const initialState: InitialState = {
  chatList: [],
  selectedCollaboration: {
    id: "",
    fullName: "",
    image: "",
    lastMessages: "",
    unreadMessages: [],
    // lastInteractionAt: Timestamp.fromDate(new Date()),
    lastInteractionAt: Timestamp.now(),
    lastInteractionChannel: "",
    lastInteractionType: "",
    lastInteractionMessage: "",
    customer: undefined,
    customerModel: undefined,
    LastMessageModel: undefined,
  },
  listMessage: [],
  selectedChat: "",
  countTotalUnreadMessages: 0,
};

export const ChatSlice = createSlice({
  name: UpdateChatListAction,
  initialState: initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<HandledMessageListItem[]>) => {
      state.chatList = action.payload;

      let totalUnreadMessages = 0;
      action.payload.forEach((element) => {
        const unreadMessages = element.unreadMessages;
        for (let i = 0; i < unreadMessages.length; i++) {
          totalUnreadMessages += unreadMessages[i].unreadCount;
        }
      });

      state.countTotalUnreadMessages = totalUnreadMessages;
    },

    updateUnreadMessage: (state, action: PayloadAction<string>) => {
      state.chatList.find((obj) => {
        if (obj.id === action.payload) {
          const readMessages = obj.unreadMessages;
          for (let i = 0; i < readMessages.length; i++) {
            readMessages[i].unreadCount = 0;
          }
          obj.unreadMessages = readMessages;
        }
      });

      let totalUnreadMessages = 0;
      state.chatList.forEach((element) => {
        const unreadMessages = element.unreadMessages;
        for (let i = 0; i < unreadMessages.length; i++) {
          totalUnreadMessages += unreadMessages[i].unreadCount;
        }
      });

      state.countTotalUnreadMessages = totalUnreadMessages;
    },

    setListMessages: (state, action: PayloadAction<Message[]>) => {
      state.listMessage = action.payload;
      console.log("---->>> ini adalah save message ke local storage");
      console.log(
        "---->>> ini adalah save message ke local storage1 : " +
          lc.LCName.Messages +
          state.selectedChat
      );
      console.log(
        "---->>> ini adalah save message ke local storage2 : " +
          JSON.stringify(action.payload)
      );
      lc.setItemLC(lc.LCName.Messages + state.selectedChat, action.payload);
      console.log(action.payload);
    },

    setSelectedChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = action.payload;
      console.log(action.payload);
    },

    addIncomingMessages: (state, action: PayloadAction<Message>) => {
      state.listMessage = [...state.listMessage, action.payload];
      lc.setItemLC(lc.LCName.Messages + state.selectedChat, state.listMessage);
      console.log(action.payload);
    },

    deleteMessage: (state) => {
      state.listMessage = [];
      state.selectedChat = "";
      state.chatList = [];
      state.selectedCollaboration = {
        id: "",
        fullName: "",
        image: "",
        lastMessages: "",
        unreadMessages: [],
        // lastInteractionAt: Timestamp.fromDate(new Date()),
        lastInteractionAt: Timestamp.now(),
        lastInteractionChannel: "",
        lastInteractionType: "",
        lastInteractionMessage: "",
        customer: undefined,
        customerModel: undefined,
        LastMessageModel: undefined,
      };
      state.countTotalUnreadMessages = 0;
      state.messageList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setChatList,
  setListMessages,
  setSelectedChat,
  updateUnreadMessage,
  addIncomingMessages,
  deleteMessage,
} = ChatSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default ChatSlice.reducer;
