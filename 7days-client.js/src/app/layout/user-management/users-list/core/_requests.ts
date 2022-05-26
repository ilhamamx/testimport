import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../resources/helpers'
import {Contact, ContactsQueryResponse} from './_models'
import { fetchCustomers } from '../../../../../actions'
//import { Contact } from '../../../../pages/Contact'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `https://preview.keenthemes.com/theme-api/api/users/query` //`${API_URL}/users/query`

//

const getContacts = (query: string): Promise<ContactsQueryResponse>  => {
  let contactQueryResponse: ContactsQueryResponse;
  
  return fetchCustomers().then(customers => {
  
    
    var customersLength = customers.length;
    let dataUser = [];
    for (var i = 0; i < customersLength; i++) {
      let data = customers[i].data;
      dataUser.push(data);
      
      }
      
      let contactsItem = {
        data: dataUser
      }
      contactQueryResponse = contactsItem;
        
      
    //TODO response from firebase
    
    //console.log("this is customer: "+JSON.stringify(customers));
    
    
    return contactQueryResponse;
  })
  // console.log("query : " + query)
  // return axios
  //   .get(`${GET_USERS_URL}?${query}`)
  //   .then((d: AxiosResponse<ContactsQueryResponse>) => d.data)
}

const getContactById = (id: ID): Promise<Contact | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Contact>>) => response.data)
    .then((response: Response<Contact>) => response.data)
}

const createContact = (contact: Contact): Promise<Contact | undefined> => {
  return axios
    .put(USER_URL, contact)
    .then((response: AxiosResponse<Response<Contact>>) => response.data)
    .then((response: Response<Contact>) => response.data)
}

const updateContact = (contact: Contact): Promise<Contact | undefined> => {
  return axios
    .post(`${USER_URL}/${contact.id}`, contact)
    .then((response: AxiosResponse<Response<Contact>>) => response.data)
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
