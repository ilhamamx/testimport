firebaseDB = require('../db/firebase')
const { db } = firebaseDB

const getCollaborationByCustomerAndCompany = async (customerRef, companyRef) => {

  console.log('run message')
  if (!customerRef || !companyRef)
    return null;

  return await db.collection('collaborations')
    .where('company', '==',  companyRef)
    .where('customer', '==', customerRef)
    .get()
    .then(snaps => {
      console.log('snaps', snaps.docs)
      return snaps.docs.map(snap => 
        ({...snap.data(), id: snap.id}) 
      )
    })
    .catch(error => {
      //TODO
      console.log(error);
    });

}

module.exports = {
  getCollaborationByCustomerAndCompany
}