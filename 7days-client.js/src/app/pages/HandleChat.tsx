import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../styles/components/Button";
import * as Log from "../../util/SDayslogger";

export function HandleChat() {
  console.log("this is handle chat");
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

  return (
      <div>
        <h1>Handle Chat page</h1>
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

                  {/* ini test misal ada content */}
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
                  <p>text 1</p>
      </div>
  );
}
