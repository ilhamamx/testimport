import React from "react"
import db from "../../db"


export const deleteTestMessage = () => {

  db.collection("messages")
    .where("textContent","<=", "Ini pesan : "+ '\uf8ff')
    .limit(2)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length===0)
        return false;
      
      snapshot.docs.forEach(async doc => {
        const id = doc.id
        const data = doc.data()
        await db.collection("messages").doc(id).delete()
          .then(() => console.log(`deleted data ${id} with ${JSON.stringify(data)}`))
          .catch((error:string) => {
            console.error("Error removing document: ", error);
        });
        
      })



    })
    
  return ;
}