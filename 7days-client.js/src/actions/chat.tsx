import * as collaboration from "../db/serviceCollaborations"
import * as ChatMessage from "../db/serviceMessage"
import * as message from "../db/serviceMessage"
import { User,Customer, HandledMessageListItem, Message} from "../app/layout/chat/models/ChatItem.model"
import * as lc from '../app/modules/localstorage/index'

export const fetchCollaborations = (uid: string, company: string ) => {
  return collaboration
  .fetchCollaborationsByUser(uid, company)
  .then(async collaborations => {
    const newCollabs = 
    await Promise.all(
      collaborations.map(async collaboration => {
        const customer = await collaboration.customer!.get();
        const user = await collaboration.toUser?.get();
        const message = await ChatMessage.unreadMessages(collaboration.id);
        collaboration.unreadMessages = message;
        if(customer !== undefined){
          collaboration.customerModel = customer.data() as Customer;
        }
        if(user !== undefined){
          collaboration.userModel = user.data() as User;
        }
        return collaboration
      })
    )
    return newCollabs
  })
}

export const fetchMessageCollaboration = (collaborationid: string) => {
  const listMessages: Message[] = lc.getItemLC(lc.LCName.Messages+collaborationid);
  if (listMessages != null ) {
    return Promise.all(listMessages);
  } else {
    return message
    .fetchMessage(collaborationid)
    .then(async messages => {
      const newMessage = 
      await Promise.all(
        messages.map(async messages => {
          const customer = await messages.customer?.get();
          const user = await messages.user?.get();
          if(customer !== undefined){
            messages.customerModel = customer.data() as Customer;
          }
          if(user !== undefined){
            messages.userModel = user.data() as User;
          }
          return messages
        })
      )
      lc.setItemLC(lc.LCName.Messages+collaborationid,newMessage);
      return newMessage
    });
  }
}

export const createCollaborationMessage = (Message: any, collaboration: string) => {
  return message.createMessage(Message,collaboration);
} 

export const clearUnreadMessages = ( collaborationId: string) => {
  return message
  .updateUnreadMessages(collaborationId)
}