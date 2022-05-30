import firebase from 'firebase/compat/app'
import {
  FETCH_CUSTOMER_SUCCESS,
} from '../types';

import * as db from "../db";
import { resourceLimits } from 'worker_threads';

// export const fetchCustomers = () => (dispatch : any) =>
//   api.fetchCustomers()
//   .then((customers) =>
//     dispatch({
//       type: FETCH_CUSTOMER_SUCCESS,
//       customers
//     })\
//   );

  export const fetchCustomers = ( search: string, limit: number) => db.fetchCustomers( search, limit)

  export const deleteCustomer = (id: string ) => db.deleteCustomer(id)