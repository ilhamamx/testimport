/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCustomerByID } from "../../../../db";
import { KTSVG } from "../../../../resources/helpers";
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from "../../../../resources/partials/widgets";
import { Contact } from "../../../layout/contact-management/contact-list/core/_models";
import { useTranslation } from "react-i18next";

export const Overview = ({ customer }: { customer: Contact }) => {
  const location = useLocation();
  const customerData: Contact = customer;
  const { t } = useTranslation();
  console.log("customersss ==>> " + customer.id);

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">{t("CD.Title.ProfileDetail")}</h3>
          </div>

          <Link
            to={
              "/contact/contact-detail/settings/" +
              customer.firstName +
              (customer.lastName ? "-" + customer.lastName : "")
            }
            state={{
              id: customer.id,
              name:
                customer.firstName +
                (customer.lastName ? " " + customer.lastName : ""),
            }}
            className={
              "btn btn-primary align-self-center justify-content-end " +
              (location.pathname ===
                "/contact/contact-detail/settings/" +
                  customer.firstName +
                  (customer.lastName ? "-" + customer.lastName : ""))
            }
          >
            {t("CD.Button.EditProfile")}
          </Link>
          {/* <button className="btn btn-secondary align-self-center disabled">
            Save Changes
          </button> */}
        </div>

        <div className="card-body p-9">
          <div className="row align-items-start pb-3">
            <label className="col-sm-2 text-dark">
              {t("CD.Input.FirstName")}
            </label>
            <div className="col-sm-2">
              <span className="fs-6 text-muted">{customer.firstName}</span>
            </div>

            <label className="col-sm-2 text-dark">
              {t("CD.Input.LastName")}
            </label>
            <div className="col-sm-2">
              {customer.lastName ? (
                <span className="fs-6 text-muted">{customer.lastName}</span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>

            <label className="col-sm-2 text-dark">{t("CD.Input.Gender")}</label>
            <div className="col-sm-2">
              {customer.gender ? (
                <span className="fs-6 text-muted">{customer.gender}</span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>
          </div>

          <div className="row align-items-start pb-3">
            <label className="col-sm-2 text-dark">
              {t("CD.Input.Birthdate")}
            </label>
            <div className="col-sm fv-row">
              {customer.birthdate ? (
                <span className="fs-6 text-muted">{customer.birthdate}</span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>

            <label className="col-sm-2 text-dark">
              {t("CD.Input.MaritalStatus")}
            </label>
            <div className="col-sm fv-row">
              {customer.maritalStatus ? (
                <span className="fs-6 text-muted">
                  {customer.maritalStatus}
                </span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>

            <label className="col-sm-2 text-dark"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>
          <div className="card-header ps-0">
            <div className="card-title m-0 pt-9 pb-3">
              <h4 className="fw-bolder m-0">{t("CD.Input.Address")}</h4>
            </div>
          </div>
          <div className="row align-items-start pt-3 pb-3">
            <label className="col-sm-2 text-dark">{t("CD.Input.City")}</label>
            <div className="col-sm fv-row">
              {customer.city ? (
                <span className="fs-6 text-muted">{customer.city}</span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>
            <label className="col-sm-2 text-dark">
              {t("CD.Input.ZipCode")}
            </label>
            <div className="col-sm fv-row">
              {customer.zipcode ? (
                <span className="fs-6 text-muted">{customer.zipcode}</span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>

            <label className="col-sm-2 text-dark"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>

          <div className="row align-items-start pb-3">
            <label className="col-sm-2 text-dark">
              {t("CD.Input.Country")}
            </label>
            <div className="col-sm fv-row">
              {customer.country ? (
                <span className="fs-6 text-muted">{customer.country}</span>
              ) : (
                <span className="fs-6 text-muted">-</span>
              )}
            </div>

            <label className="col-sm-2 text-dark"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>

            <label className="col-sm-2 text-dark"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>

          {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company Site</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                keenthemes.com
              </a>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Country
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Germany</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Communication</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>Email, Phone</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>Yes</span>
            </div>
          </div> */}

          {/* <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTSVG
              path='icons/duotune/general/gen044.svg'
              className='svg-icon-2tx svg-icon-warning me-4'
            />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
                <div className='fs-6 text-gray-600'>
                  Your payment was declined. To start using tools, please
                  <Link className='fw-bolder' to='/crafted/account/settings'>
                    {' '}
                    Add Payment Method
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
    </>
  );
};
