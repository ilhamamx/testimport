import { HandledMessageListItem } from "../../../layout/chat/models/ChatItem.model";

interface InitialState {
  chatList: HandledMessageListItem[];
}
const UpdateChatListAction: string = "UpdateChatList";

export default InitialState;
export { UpdateChatListAction };
