const firebaseDB = require('./firebase')

const { db , Timestamp } = firebaseDB

console.log(firebaseDB.vari)
console.log(Timestamp.fromDate(new Date()))


const fetchServices = () => {
  return db
    .collection('testing').get()
    .then(snapshot => {
      const services = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
      services.forEach(element => {
      
        //console.log("------------------------------")
        console.log("%s - %s", element.title, element.description)
        console.log("==============================")
        
      });
    })  
}

fetchServices()