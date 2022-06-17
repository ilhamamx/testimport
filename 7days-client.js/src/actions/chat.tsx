import * as collaboration from "../db/serviceCollaborations"
import * as ChatMessage from "../db/serviceMessage"
import * as message from "../db/serviceMessage"
import { User,Customer, HandledMessageListItem, Message, Company, Account, MessageStatus} from "../app/layout/chat/models/ChatItem.model"
import * as lc from '../app/modules/localstorage/index'
import * as server from "../api/server/message"


export const fetchCollaborations = (uid: string, company: string ) => {
  return collaboration
  .fetchCollaborationsByUser(uid, company)
  .then(async collaborations => {
    const newCollabs = 
    await Promise.all(
      collaborations.map(async collaboration => {
        const customer = await collaboration.customer!.get();
        const user = await collaboration.toUser?.get();
        // const company = await collaboration.company?.get();
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

export const createCollaborationMessage = (Message: Message, companyID: string ,selectedChat: string, account: Account|undefined, customer: Customer|undefined) => {
  //Send Request To Server Side
  if (account !== undefined && customer !== undefined) {
    server.sendRequestMessage(
      Message.channel, 
      companyID, 
      account.whatsappNumber, 
      customer.phoneNumber, 
      Message.messageType, 
      Message.previewurl, 
      Message.textContent)
    .then((response) => {
      const resp = JSON.parse(response);
      if (resp.responseCode && resp.response) { 
        if(resp.responseCode!==""){
          Message.responseCode=resp.responseCode;
        }
        if (resp.response!=="") {
          let tempResponse = resp.response;
          const messageChannel = Message.channel;
          if (tempResponse.resultCode && resp.resultCode!=="") {
            Message.resultCode = tempResponse.resultCode;
          }
          if (tempResponse.message && resp.message!=="") {
            Message.resultMessage = tempResponse.message;
          }
          if (tempResponse.messageID && resp.messageID!=="") {
            Message.resultMessageId = tempResponse.messageID;
          }
          if (tempResponse.errorCode && resp.errorCode!=="") {
            Message.errorCode = tempResponse.errorCode;
          }
          if(Message.channel==="whatsapp"){
            if (tempResponse.whatsapp && resp.whatsapp!=="") {
              Message.responseJson = tempResponse.whatsapp;
            }
          }
        }
        return message.createMessage(Message);
      } else if (resp.responseCode && !resp.response) {
        if(resp.responseCode && resp.responseCode!==""){
          Message.responseCode= resp.responseCode;
        }
      } else {
        Message.messageStatus = MessageStatus.failed;
        Message.resultMessage = "No response or reponsecode from server side."
        return message.createMessage(Message);
      }
    }).catch(
      function (error) {
        Message.messageStatus = MessageStatus.failed;
        Message.resultMessage = error
        return message.createMessage(Message);
      }
    ) ;
  } else {
    //Create Firebase Message 
    Message.messageStatus = MessageStatus.failed;
    if(account === undefined && customer === undefined){
      Message.resultMessage = "No data customer and account was found."

    }else if(account !== undefined && customer === undefined){
      Message.resultMessage = "No data customer was found."

    }else{
      Message.resultMessage = "No data account was found."
    }
    return message.createMessage(Message);
  }
  
} 

export const clearUnreadMessages = ( collaborationId: string) => {
  return message
  .updateUnreadMessages(collaborationId)
}