const firebase = require('firebase/compat/app')


const loginSuperUser = async (email, password) => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(`ini data super user uid ${user.user.uid}` );
    })
    .catch(error => {
      //TODO
      console.log(error);
    });
}



module.exports = {
  loginSuperUser
}