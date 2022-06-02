import db from '../db'

export const fetchCustomers = () =>
  db.collection('customers')
    .where("companyID", "==", "cWt6gXnRGTFqL5TbYn6r")
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return customers;
    });