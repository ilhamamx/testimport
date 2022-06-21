firebaseDB = require('../db/firebase')
const { db } = firebaseDB

const getCustomerByPhone = async phoneNumber => {

  console.log('run message')

  if (!phoneNumber)
    return null;

  return await db.collection('customers')
    .where('phoneNumber', '==', phoneNumber)
    .where('isActive', '==', true)
    .get()
    .then(snaps => {

      return snaps.docs.map(snap => 
        ({...snap.data(), id: snap.id}) 
      )

    })
    .catch(error => {
      //TODO
      console.log(error);
    });

}

const getCustomerByPhoneAndCompany = async (phoneNumber, companyRef) => {
  console.log("run message");

  if (!phoneNumber || !companyRef)
    return null;

  return await db
    .collection("customers")
    .where("phoneNumber", "==", phoneNumber)
    .where("company", "==", companyRef)
    .where("isActive", "==", true)
    .get()
    .then((snaps) => {
      return snaps.docs.map((snap) => ({ ...snap.data(), id: snap.id }));
    })
    .catch((error) => {
      //TODO
      console.log(error);
    });
};

module.exports = {
  getCustomerByPhone,
  getCustomerByPhoneAndCompany,
};