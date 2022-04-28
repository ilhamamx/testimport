import React from "react";
import { Link } from "react-router-dom";

export function Dashboard() {
  console.log("this is dashboard");
  return (
    <div>
      <h1>Dashboard page</h1>
      <br></br>
      <br></br>
      <Link
        to="/auth/reset-password?token=error123456"
        className="btn btn-lg btn-primary fw-bolder"
        data-testid="error500"
      >
        erorr 500
      </Link>
    </div>
  );
}
