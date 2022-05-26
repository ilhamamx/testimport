import db from '../db'

export const fetchCustomers = () =>
  db.collection('customers')
    .where("companyID", "==", "cWt6gXnRGTFqL5TbYn6r")
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }
      
      )
      
      );
      //console.log(doc);
      return customers;
    });