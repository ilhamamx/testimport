import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useMediaQuery } from "react-responsive";
import axios from "axios"
import * as api from "../../api"
import * as action from "../../actions/playground"
import Button from "../../styles/components/Button";

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

const DeviceTest: FC = () => {
  const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 900px)"});
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return (
    <>
      <h3>Device Test!</h3>
      {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isBigScreen && <p>You have a huge screen</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
      {/* <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p> */}
      {/* {isRetina && <p>You are retina</p>} */}
    </>
  )
}

const Playground: FC = () => {
  const { t } = useTranslation();
  //axiosPost();
  // fetchDataTesting()
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="faq-page">
        <h2>Playground Page</h2>
        <DeviceTest />

        <Button
        id="btnError"
        className="btn btn-lg btn-primary fw-bolder"
        onClick={async () => {
          action.deleteUnused()
        }}
      >
        Delete Message 
        </Button>
      </div>

      
    </>
  );
};

export { Playground };