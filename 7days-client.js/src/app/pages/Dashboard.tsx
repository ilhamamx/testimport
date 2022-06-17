import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import Button from "../../styles/components/Button";
import * as Log from "../../util/SDayslogger";
import * as con from "../../db/connection";
import { useEffect } from "react";
import { PageTitle, PageLink } from "../layout/core/PageData";
import { useState } from "react";
import { Notification, Color, info } from "../modules/notify";
import db, { Timestamp } from "../../db";
import { subsToMessages } from "../../api/firebase";
import { getItemLC } from "../modules/localstorage";
import { createRef } from "../../db/connection";

import { Collaboration, Message } from "../../app/modules/collaboration/model";
import { id } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const createMessage = (data: any) => {
  return db
    .collection("messages")
    .add(data)
    .then((docRef) => {
      console.log("New message: " + docRef.id);
    })
    .catch((err) => {
      console.log("Error create message : ", err);
    });
};

const error = async (nav: NavigateFunction) => {
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
};

export function Dashboard() {
  console.log("this is dashboard");
  const nav = useNavigate();

  const userId = getItemLC("UID");
  console.log("Local Storage ===>>" + userId);

  let userStatus = con.status(userId);
  console.log("Check Offline or Online Status User : " + userStatus);
  // let message: any;

  // const onNewData = (messageContent: Message) => {
  //   // TODO: tampilkan notification
  //   console.log("new Data Exists : ", message);
  //   message = messageContent.textContent;
  //   info(message, true);

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
  // };

  //
  // useEffect(() => {
  //   // const unsubs = subsToCollaborations(userId, onNewData);
  //   const unsubs = subsToMessages(userId, onNewData);

  //   return () => {
  //     unsubs();
  //   };
  // }, []);

  // const [notifications, setNotifications] = useState<any>([]);

  const messageDummy = {
    collaboration: createRef("collaboration", "zojfWIhOoy3rhtR0ppne"),
    customer: createRef("customers", "jfi5G083kqEWa5OrtWTI"), //razor
    user: createRef("users", userId),
    destination: "inbound",
    channel: "shopee",
    isActive: true,
    createdAt: Timestamp.now(),
    updateAt: Timestamp.now(),
    messageType: "text",
    textContent: "Ini pesan : " + uuidv4(),
    notifiedAt: null,
  };

  const createMessageDummy = () => {
    console.log("ini create message");
    createMessage(messageDummy);
  };

  return (
    <div>
      <div className="mb-0 lh-1">
        <span
          className={`badge badge-${
            userStatus === "online" ? "success" : "danger"
          } badge-circle w-10px h-10px me-1`}
        ></span>
        <span className="fs-7 fw-bold text-gray-400">
          {userStatus === "online" ? "User is online" : "User is offline"}
        </span>
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => createMessageDummy()}
      >
        Test Notification
      </button>

      {/* <div className="alert alert-dismissible bg-light-primary d-flex flex-column flex-sm-row p-5 mb-10">
        <span className="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
          ...
        </span>
        <div className="d-flex flex-column text-primary pe-0 pe-sm-10">
          <h5 className="mb-1">This is an alert</h5>
          <span>
            The alert component can be used to highlight certain parts of your
            page for higher content visibility.
          </span>
        </div>

        <button
          type="button"
          className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
          data-bs-dismiss="alert"
        >
          <span className="svg-icon svg-icon-1 svg-icon-primary">...</span>
        </button>
      </div> */}
    </div>
  );
}
