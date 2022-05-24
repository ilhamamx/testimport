import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../styles/components/Button";
import * as Log from "../../util/SDayslogger";
import { useSelector } from "react-redux";
import { RootState } from '../../setup/redux/store'
import * as con from '../../db/connection';
import { setIsOnline } from "../../app/modules/auth/redux/AuthSlice";

export function Dashboard() {
  console.log("this is dashboard");
  const nav = useNavigate();
  async function error() {
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

  let ilhamstatus =  con.status("8BccV9T1R8huPSiJ9fGNway4yVD3");
  console.log("Check Offline or Online Status Ilham User : " + ilhamstatus);

  return (
    <div>
      <div className='mb-0 lh-1'>
        <span className={`badge badge-${ilhamstatus === "online" ? "success" : "danger"} badge-circle w-10px h-10px me-1`}></span>
        <span className='fs-7 fw-bold text-gray-400'>{ilhamstatus === "online" ? "ilham is online":"ilham is offline"}</span>
      </div>
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
          error();
        }}
      >
        Test Error 500 Sentry
      </Button>

    </div>
  );
}
