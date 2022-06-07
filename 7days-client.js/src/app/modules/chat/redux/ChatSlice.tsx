import InitialState, { UpdateChatListAction } from "./ChatRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HandledMessageListItem } from "../../../layout/chat/models/ChatItem.model";

const initialState: InitialState = {
  chatList: [],
};

export const ChatSlice = createSlice({
  name: UpdateChatListAction,
  initialState: initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<HandledMessageListItem[]>) => {
      state.chatList = action.payload;
      console.log(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatList } =
ChatSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default ChatSlice.reducer;
