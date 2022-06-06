import firebase from 'firebase/compat/app'
import {
  FETCH_CUSTOMER_SUCCESS,
} from '../types';

import * as db from "../db";
import { resourceLimits } from 'worker_threads';

  export const fetchCustomers = ( search: string, limit: number, companyID: firebase.firestore.DocumentReference) => db.fetchCustomers( search, limit, companyID)

  export const deleteCustomer = (id: string ) => db.deleteCustomer(id)
