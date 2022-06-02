firebaseDB = require('../db/firebase')
const { db } = firebaseDB

const getAccountByPhone = async phoneNumber => {

  console.log('run message')

  if (!phoneNumber)
    return null;

  return await db.collection('account')
    .where('whatsappNumber', '==', phoneNumber)
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

module.exports = {
  getAccountByPhone,
}