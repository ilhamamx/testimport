/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getCustomerByID } from "../../../../../../db";
import { KTSVG } from "../../../../../../resources/helpers";
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from "../../../../../../resources/partials/widgets";
import { Contact } from "../../../../../layout/contact-management/contact-list/core/_models";

export const ProfileDetailsEdit = ({ customer }: { customer: Contact }) => {
  const customerData: Contact = customer;

  console.log("customersss ==>> " + customer.id);

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>

          {/* <Link to='#' className='btn btn-secondary align-self-center disabled'>
            Edit Profil
          </Link> */}

          <button className="btn btn-primary align-self-center">
            Save Changes
          </button>
        </div>

        <div className="card-body p-9">
          <div className="row align-items-start pb-3 mb-3">
            <label className="col-sm-2 mt-4 text-dark">First Name</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="First name"
                name="firstName"
                value={customer.firstName}
              />
            </div>

            <label className="col-sm-2 text-dark mt-4">Last Name</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="last name"
                name="lastName"
                value={customer.lastName}
              />
            </div>

            <label className="col-sm-2 text-dark mt-4">Gender</label>
            <div className="col-sm-2">
              <select
                className="form-select form-control form-control-solid mb-3 mb-lg-0"
                name="gender"
                value={customer.gender}
              >
                {/* <option selected>Open this select menu</option> */}
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="row align-items-start pb-3 mb-3">
            <label className="col-sm-2 text-dark mt-4">Birthdate</label>
            <div className="col-sm fv-row">
              <input
                type="date"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                name="birthdate"
              />
            </div>

            <label className="col-sm-2 text-dark mt-4">Marietal Status</label>
            <div className="col-sm fv-row">
              <select
                className="form-select form-control form-control-solid mb-3 mb-lg-0"
                name="marietalStatus"
              >
                {/* <option selected>Open this select menu</option> */}
                <option value="single">Single</option>
                <option value="married">Married</option>
                {/* <option value="other">Other</option> */}
              </select>
            </div>

            <label className="col-sm-2 text-dark mt-4"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>
          <div className="card-header ps-0">
            <div className="card-title m-0 pt-9 pb-3">
              <h4 className="fw-bolder m-0">Address</h4>
            </div>
          </div>
          <div className="row align-items-start pt-3 pb-3">
            <label className="col-sm-2 text-dark mt-4">City</label>
            <div className="col-sm fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                name="city"
                value={customer.city}
              />
            </div>
            <label className="col-sm-2 text-dark mt-4">Zip Code</label>
            <div className="col-sm fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                name="zipcode"
                value={customer.zipcode}
              />
            </div>

            <label className="col-sm-2 text-dark mt-4"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>

          <div className="row align-items-start pb-3 mb-3">
            <label className="col-sm-2 text-dark mt-4">Country</label>
            <div className="col-sm fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                name="country"
                value={customer.country}
              />
            </div>

            <label className="col-sm-2 text-dark mt-4"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>

            <label className="col-sm-2 text-dark mt-4"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
