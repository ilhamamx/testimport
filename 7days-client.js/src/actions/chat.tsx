import * as collaboration from "../db/serviceCollaborations"
import * as ChatMessage from "../db/serviceMessage"
import * as message from "../db/serviceMessage"
import Moment from 'moment';
import { Customer} from "../app/layout/chat/models/ChatItem.model"

export const fetchCollaborations = (uid: string, company: string ) => {
  return collaboration
  .fetchCollaborationsByUser(uid, company)
  .then(async collaborations => {
    const newCollabs = 
    await Promise.all(
      collaborations.map(async collaboration => {
        const customer = await collaboration.customer!.get();
        const message = await ChatMessage.unreadMessage(collaboration.id);
        collaboration.unreadMessages = message;
        if(customer === undefined){
          return collaboration
        }
        collaboration.customerModel = customer.data() as Customer;
        return collaboration
      })
    )
    return newCollabs
  })
}

export const convertPresentTime = (convertime:Date) => {
  Moment.locale('en');
  const fullDate = Moment().format('yyyy/MM/dd');
  const timeFormat = Moment().format('hh:mm a');
}