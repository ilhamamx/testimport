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
//     })
//   );

  export const fetchCustomers = () => db.fetchCustomers()