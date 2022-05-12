firebaseDB = require('../db/firebase')
const { db } = firebaseDB

const getUserEMailByPhone = async phoneNumber => {

  console.log('run message')

  if (!phoneNumber)
    return null;

  return await db.collection('users')
    .where('phoneNumber', '==', phoneNumber)
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


const fetchUsers = () => {
  return db
    .collection('users').get()
    .then(snapshot => {
      const services = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
      services.forEach(element => {
      
        //console.log("------------------------------")
        console.log("%s - %s - name %s", element.phoneNumber, element.email, element.name)
        console.log("==============================")
        
      });
    })  
}

module.exports = {
  getUserEMailByPhone,
  fetchUsers
}
