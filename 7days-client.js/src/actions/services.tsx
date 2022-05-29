import firebase from 'firebase/compat/app'
import {
  FETCH_CUSTOMER_SUCCESS,
} from '../types';

import * as db from "../db";

// export const fetchCustomers = () => (dispatch : any) =>
//   api.fetchCustomers()
//   .then((customers) =>
//     dispatch({
//       type: FETCH_CUSTOMER_SUCCESS,
//       customers
//     })\
//   );

  export const fetchCustomers = (sort: string , order: firebase.firestore.OrderByDirection , search: string) => db.fetchCustomers(sort, order, search)

  export const deleteCustomer = (id: string ) => db.deleteCustomer(id)