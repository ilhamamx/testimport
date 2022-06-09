import { HandledMessageListItem, Message } from "../../../layout/chat/models/ChatItem.model";

interface InitialState {
  chatList: HandledMessageListItem[];
  selectedCollaboration: HandledMessageListItem;
  listMessage: Message[];
}
const UpdateChatListAction: string = "UpdateChatList";

export default InitialState;
export { UpdateChatListAction };
