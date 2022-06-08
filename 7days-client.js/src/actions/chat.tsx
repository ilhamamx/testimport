import * as collaboration from "../db/serviceCollaborations"
import {HandledMessageListItem, Customer} from "../app/layout/chat/models/ChatItem.model"
import * as chat from "../app/modules/chat/redux/ChatSlice"



export const fetchCollaborations_old = (uid: string, company: string ) => 
  collaboration
    .fetchCollaborationsByUser(uid, company)
    .then(collabs => collabs)


export const fetchCollaborations = (uid: string, company: string ) => {
  return collaboration
  .fetchCollaborationsByUser(uid, company)
  .then(async collaborations => {
    const newCollabs = 
    await Promise.all(
      collaborations.map(async collaboration => {
        const customer = await collaboration.customer!.get();
        if(customer === undefined)
        {
          return collaboration
        }
        collaboration.customerModel = customer.data() as Customer;
        return collaboration
      })
    )
    return newCollabs

  })
}

export const fetchCollaborations_2 = (uid: string, company: string ) => 
  collaboration
    .fetchCollaborationsByUser(uid, company)
    .then(async collaborations => {
      const newCollabs =  collaborations.map(async collaboration => {
        const customer = await collaboration.customer!.get();
        if(customer === undefined)
        {
          return collaboration
        }
        console.log("------------->>>> Data No Promise : "+JSON.stringify(customer.data()));
        collaboration.customerModel = customer.data() as Customer;
        return collaboration
      })
      return newCollabs
    })

/*

export const fetchCollaborations_2 = (uid: string, company: string, dispatch:) => {
  collaboration
  .fetchCollaborationsByUser(uid, company)
  .then(async collabs => {
    let newCollabsData:HandledMessageListItem[] = [];
    collabs.forEach(async collab => {
      const customer = await collab.customer?.get();
      if(customer === undefined)
      {
        collab.customerModel = undefined
      }else {
        collab.customerModel = customer?.data()! as Customer
      }
      newCollabsData.push(collab);

    });

    return newCollabsData;
  })

  */
    /*
    const newCollabsData:HandledMessageListItem[] = await collabs.map( async collaboration => {
      const customer = await collaboration.customer?.get();
      if(customer === undefined)
      {
        return collaboration
      }
      collaboration.customerModel = customer.data() as Customer;
      return collaboration
    })

    return newCollabsData;

  })

  */

 

    //.then(collabs =>  collabs)

    /**
     * const customer = collaborations
     */