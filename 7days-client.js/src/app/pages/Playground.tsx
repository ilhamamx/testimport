import { FC } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios"
import * as api from "../../api"
import db, {fetchDataTesting} from '../../db'

 const axiosPost = async () => {
   console.log("axios post")
   const config = {
     headers : {
      'Authorization': 'Bearer $2a$10$SoOcDYU6M6tg7oUe00UVQeCgji/yfRpvYfRqU4H9kIKY1.SEC0c5a'
     }
   }
  await axios.post('http://localhost:3001/user/findByPhoneNumber', {phoneNumber : "0811303100"})
    .then(response => console.log(response))
    .catch(error => console.log('axios catch ' +error))
  console.log('axios finished')

}

const Playground: FC = () => {
  const { t } = useTranslation();
  //axiosPost();
  // fetchDataTesting()
  api.logout()
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="faq-page">
        <h2>Playground Page</h2>
        
      </div>
    </>
  );
};

export { Playground };