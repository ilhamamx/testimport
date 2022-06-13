import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import Button from "../../styles/components/Button";
import * as Log from "../../util/SDayslogger";
import * as con from '../../db/connection';
import { useEffect } from "react"
import { PageTitle, PageLink } from "../layout/core/PageData";
import { useState } from "react";
import { Notification, Color, info } from "../modules/notify";
import db, {Timestamp} from "../../db";
import { subsToCollaborations } from "../../api/firebase";
import { getItemLC } from "../modules/localstorage";
import { createRef } from "../../db/connection";

import {Collaboration} from "../../app/modules/collaboration/model"

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const createColaboration = (contact: any) => {
  return db
    .collection("collaborations")
    .add(contact)
    .then((docRef) => {
      console.log("New collaborations : " + docRef.id);
    })
    .catch((err) => {
      console.log("Error create collaborations : ", err);
    });
};

const error = async (nav:NavigateFunction) => {
  const axios = await require("axios").default;
  try {
    const response = await axios.get(
      "http://localhost:3000/auth/reset-password"
    );
    console.log(response);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // handleAxiosError(error);
      console.log("error" + err);
      Log.SDayslogger(
        nav,
        "Testing Error Message",
        Log.SDLOGGER_INFO,
        false,
        true
      );
    } else {
      // handleUnexpectedError(error);
      console.log("error2" + error);
    }
  }
}


export function Dashboard() {
  console.log("this is dashboard");
  const nav = useNavigate();
  
  const userId = getItemLC('UID');
  console.log("Local Storage ===>>"+userId);
  
  let userStatus = con.status(userId); 
    console.log("Check Offline or Online Status User : " + userStatus);
  let message: any;
  const onNewData = (collaboration: Collaboration) => {
    
    
    
    // TODO: tampilkan notification
    console.log("new Data Exists : ", message);
    message = collaboration.lastInteractionMessage;
    info(message, true);
    
    //setNotifications([...notifications, { Color, id: notifications.length }]);
    // return (
    //   <Notification
    //     key={0}
    //     onDelete={() => deleteNotification(0)}
    //     color={Color.info}
    //     autoClose={true}
    //   >
    //     {collaboration.lastInteractionMessage}
    //   </Notification>
      
    //   )
  }
  
  //
  useEffect(() => {
    const unsubs = subsToCollaborations(userId, onNewData);
    
    return () => {
      unsubs()
    }
  }, [])
  
  const [notifications, setNotifications] = useState<any>([]);
  const dataDummy = {lastInteractionAt: Timestamp.now(),
                     company: createRef("company", "cWt6gXnRGTFqL5TbYn6r"),
                     customer: createRef("customers" , "HO3UoLdUszVvW5d5LynW"),
                     created: Timestamp.now(),
                     updateAt: Timestamp.now(),
                     handleAt: Timestamp.now(),
                     lastInteractionChannel: "whatsapp",
                     lastInteractionType: "text",
                     lastInteractionMessage: "test ",
                     toUser: createRef("users", userId)
  }
  
  const createDummyCollab = () =>{
    console.log("in create notif");
    createColaboration(dataDummy);
    
  }
  const deleteNotification = (id : number) =>
    setNotifications(
      notifications.filter((notification : any) => notification.id !== id)
  );



  return (
    <div>
      <div className='mb-0 lh-1'>
        <span className={`badge badge-${userStatus === "online" ? "success" : "danger"} badge-circle w-10px h-10px me-1`}></span>
        <span className='fs-7 fw-bold text-gray-400'>{userStatus === "online" ? "User is online":"User is offline"}</span>
      </div>
      <PageTitle breadcrumbs={usersBreadcrumbs}>Dashboard</PageTitle>
      <h1>Dashboard page</h1>
      <br></br>
      <br></br>
      <Link
        to="/auth/reset-password?token=error123456"
        className="btn btn-lg btn-primary fw-bolder"
        data-testid="error500"
      >
        Test erorr 500
      </Link>
      <br></br>
      <br></br>
      <Button
        id="btnError"
        className="btn btn-lg btn-primary fw-bolder"
        onClick={async () => {
          error(nav);
        }}
      >
        Test Error 500 Sentry
      </Button>
      <br></br>
      <br></br>
      <button type='button' className='btn btn-primary' onClick={() => createDummyCollab()}>
        Test Notification
      </button>
      
    </div>
    
  )}