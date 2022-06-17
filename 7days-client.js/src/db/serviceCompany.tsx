import db from ".";

export const getCustomerCountByCompanyID = (id: string) =>
  db
    .collection("company")
    .doc(id)
    .get()
    .then((snapshot) => {
      const counter = snapshot.get("customerCount");
      return counter;
    });
// return company;

export const fetchCountCustomers = () =>
  db
    .collection("company")
    .doc("cWt6gXnRGTFqL5TbYn6r")
    .get()
    .then((doc) => {
      let count = 0;
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.error("No such document!");
      } else {
        const company = doc.data();
        if (company) {
          count = company.customerCount;
        }
      }
      return count;
    });