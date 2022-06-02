import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../resources/helpers";
import {
  Contact,
  ContactsQueryResponse,
} from "../../../../layout/contact-management/contact-list/core/_models";
import { fetchCustomers, deleteCustomer } from "../../../../../actions";
//import { Contact } from '../../../../pages/Contact'
import firebase from "firebase/compat/app";
import db, { fetchCustomersNext, fetchCustomersPrev , getCustomerCountByCompanyID, fetchCountCustomers} from "../../../../../db";
import { format, compareAsc, compareDesc } from "date-fns";

const API_URL = process.env.REACT_APP_THEME_API_URL;
const USER_URL = `${API_URL}/user`;
const GET_USERS_URL = `https://preview.keenthemes.com/theme-api/api/users/query`; //`${API_URL}/users/query`

//

const getContacts = (
  sort: string | undefined,
  order: string | undefined,
  search: string | undefined,
  action: string | undefined,
  lastId: string | undefined,
  limit: number
): Promise<ContactsQueryResponse> => {
  let contactQueryResponse: ContactsQueryResponse;
  // console.log("query : " +query)
  // console.log("Sort : " + sort);
  // console.log("Order : " + order);
  // console.log("search : " + search)
  console.log("item : " + limit)
  console.log("action : " + action)

  let sortBy: string = "firstName";
  let orderBy: firebase.firestore.OrderByDirection = "asc";
  let searchBy: string = "";

  if (sort !== undefined && sort !== null) {
    sortBy = sort;
  }

  if (order !== undefined && order !== null) {
    if (order === "desc") orderBy = "desc";
  }

  if (search !== undefined && search !== null) {
    searchBy = search;
  }
  console.log("order =====>>" + orderBy);

  if(action === "prev"){
    return fetchCustomersPrev(searchBy, limit).then((customers) => {
      var customersLength = customers.length;
      let dataUser = [];
      for (var i = 0; i < customersLength; i++) {
        let data = customers[i].data;
        data.id = customers[i].id;
        if (data.lastInteractionAt != undefined) {
          data.lastInteractionAt = format(
            new Date(customers[i].data.lastInteractionAt.seconds * 1000),
            "d MMM yyyy, h:mm aaa"
          );
        }
        dataUser.push(data);
      }
  
      if (dataUser.length > 0) {
        if (sort === "firstName") {
          dataUser = dataUser?.sort((a, b) =>
            a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.firstName.toLowerCase() > b.firstName.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "email") {
          dataUser = dataUser?.sort((a, b) =>
            a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.email.toLowerCase() > b.email.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "phoneNumber") {
          dataUser = dataUser?.sort((a, b) =>
            a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "lastInteractionAt") {
          dataUser = dataUser?.sort((a, b) =>
            new Date(a.lastInteractionAt) > new Date(b.lastInteractionAt) ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              new Date(a.lastInteractionAt) > new Date(b.lastInteractionAt)
                ? -1
                : 1
            );
          }
        }
      }
  
      let contactsItem = {
        data: dataUser,
      };
      contactQueryResponse = contactsItem;
  
      return contactQueryResponse;
    });
  }else if (action==="next"){
    return fetchCustomersNext(searchBy, limit).then((customers) => {
      var customersLength = customers.length;
      let dataUser = [];
      for (var i = 0; i < customersLength; i++) {
        let data = customers[i].data;
        data.id = customers[i].id;
        if (data.lastInteractionAt != undefined) {
          data.lastInteractionAt = format(
            new Date(customers[i].data.lastInteractionAt.seconds * 1000),
            "d MMM yyyy, h:mm aaa"
          );
        }
        dataUser.push(data);
      }
  
      if (dataUser.length > 0) {
        if (sort === "firstName") {
          dataUser = dataUser?.sort((a, b) =>
            a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.firstName.toLowerCase() > b.firstName.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "email") {
          dataUser = dataUser?.sort((a, b) =>
            a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.email.toLowerCase() > b.email.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "phoneNumber") {
          dataUser = dataUser?.sort((a, b) =>
            a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "lastInteractionAt") {
          dataUser = dataUser?.sort((a, b) =>
            new Date(a.lastInteractionAt) > new Date(b.lastInteractionAt) ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              new Date(a.lastInteractionAt) > new Date(b.lastInteractionAt)
                ? -1
                : 1
            );
          }
        }
      }
  
      let contactsItem = {
        data: dataUser,
      };
      contactQueryResponse = contactsItem;
  
      return contactQueryResponse;
    });
  }else{
    return fetchCustomers(searchBy, limit).then((customers) => {
      var customersLength = customers.length;
      let dataUser = [];
      for (var i = 0; i < customersLength; i++) {
        let data = customers[i].data;
        data.id = customers[i].id;
        if (data.lastInteractionAt != undefined) {
          data.lastInteractionAt = format(
            new Date(customers[i].data.lastInteractionAt.seconds * 1000),
            "d MMM yyyy, h:mm aaa"
          );
          // console.log("Test : " + new Date (data.lastInteractionAt))
        }
        dataUser.push(data);
      }
  
      if (dataUser.length > 0) {
        if (sort === "firstName") {
          dataUser = dataUser?.sort((a, b) =>
            a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.firstName.toLowerCase() > b.firstName.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "email") {
          dataUser = dataUser?.sort((a, b) =>
            a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.email.toLowerCase() > b.email.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "phoneNumber") {
          dataUser = dataUser?.sort((a, b) =>
            a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase() ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase() ? -1 : 1
            );
          }
        }
        if (sort === "lastInteractionAt") {
          dataUser = dataUser?.sort((a, b) =>
            new Date(a.lastInteractionAt) > new Date(b.lastInteractionAt) ? 1 : -1
          );
          if (orderBy === "desc") {
            dataUser = dataUser?.sort((a, b) =>
              new Date(a.lastInteractionAt) > new Date(b.lastInteractionAt)
                ? -1
                : 1
            );
          }
        }
      }
  
      let contactsItem = {
        data: dataUser,
      };
      contactQueryResponse = contactsItem;
  
      return contactQueryResponse;
    });
  }
  
};

const getContactById = (id: ID): Promise<Contact | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Contact>>) => response.data)
<<<<<<< HEAD
    .then((response: Response<Contact>) => response.data);
};
=======
    .then((response: Response<Contact>) => response.data)
    
    
}
>>>>>>> e13f031 (contact filter)

const createContact = (contact: Contact): Promise<Contact | undefined> => {
  return axios
    .put(USER_URL, contact)
    .then((response: AxiosResponse<Response<Contact>>) => response.data)
<<<<<<< HEAD
    .then((response: Response<Contact>) => response.data);
};
=======
    .then((response: Response<Contact>) => response.data)
}
>>>>>>> e13f031 (contact filter)

const updateContact = (contact: Contact): Promise<Contact | undefined> => {
  return axios
    .post(`${USER_URL}/${contact.id}`, contact)
    .then((response: AxiosResponse<Response<Contact>>) => response.data)
<<<<<<< HEAD
    .then((response: Response<Contact>) => response.data);
};

const deleteContact = (contactId: ID): Promise<void> => {
  if (contactId === undefined || contactId === null) {
  } else {
    console.log("Delete id : " + contactId);
    deleteCustomer(contactId.toString());
  }

  return Promise.resolve();
};

const deleteSelectedContacts = (contactIds: Array<ID>): Promise<void> => {
  // const requests = contactIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  const requests = contactIds.map((id) => {
    if (id === undefined || id === null) {
    } else {
      console.log("Delete id : " + id);
      deleteCustomer(id.toString());
    }
  });

  return axios.all(requests).then(() => {});
};

export {
  getContacts,
  deleteContact,
  deleteSelectedContacts,
  getContactById,
  createContact,
  updateContact,
};
=======
    .then((response: Response<Contact>) => response.data)
}

const deleteContact = (contactId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${contactId}`).then(() => {})
}

const deleteSelectedContacts = (contactIds: Array<ID>): Promise<void> => {
  const requests = contactIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getContacts, deleteContact, deleteSelectedContacts, getContactById, createContact, updateContact}
>>>>>>> e13f031 (contact filter)
