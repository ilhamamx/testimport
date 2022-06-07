/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCustomerByID } from "../../../../../../db";
import { KTSVG } from "../../../../../../resources/helpers";
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from "../../../../../../resources/partials/widgets";
import {toAbsoluteUrl} from '../../../../../../resources/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { initialContact, Contact } from "../../../../../layout/contact-management/contact-list/core/_models";
import { createContact, updateContact } from "../../../../../layout/contact-management/contact-list/core/_requests";
import { useListView } from "../../../../../layout/contact-management/contact-list/core/ListViewProvider";
import { useQueryResponse } from "../../../../../layout/contact-management/contact-list/core/QueryResponseProvider";
import { useTranslation } from "react-i18next";

type Props = {
  isUserLoading: boolean;
  contact: Contact;
};

const editContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First Name is required"),
});

export const ProfileDetailsEdit = ({ customer }: { customer: Contact }) => {  
  const { t } = useTranslation();
  const customerData: Contact = customer; 
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const nav = useNavigate();

  console.log("customersss ==>> " + customer.id);

  const [contactForEdit] = useState({
    // ...contact,
    id: customer.id,
    avatar: customer.avatar,
    firstName: customer.firstName,
    lastName: customer.lastName,
    gender: customer.gender,
    birthdate: customer.birthdate,
    maritalStatus: customer.maritalStatus,
    city: customer.city,
    zipcode: customer.zipcode,
    country: customer.country,
    firstNameInsensitive: "",

  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: contactForEdit,
    validationSchema: editContactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log("masuk update ==>> " + values);
          const fnameInsensitive = values.firstName!.toLowerCase();
          values.firstNameInsensitive = fnameInsensitive;
          if(values.gender === 'male')
            values.avatar = toAbsoluteUrl('/media/icons/avatar/m-avatar.png')
          else if(values.gender === 'female')
            values.avatar = toAbsoluteUrl('/media/icons/avatar/f-avatar.png')
          await updateContact(values);
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);        
        cancel(true);
        // nav('/contact/contact-detail/overview/'+values.firstName+"-"+values.lastName)
        // window.location.reload();
        nav(-1)
      }
    },
  });

  return (
    <>
    <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">{t('CD.Title.ProfileDetail')}
</h3>
          </div>

          {/* <Link to='#' className='btn btn-secondary align-self-center disabled'>
            Edit Profil
          </Link> */}

          {/* <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={
              // isUserLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting ) && ( //|| isUserLoading
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button> */}
          <button 
            type="submit"
            data-kt-users-modal-action="submit"
            className="btn btn-primary align-self-center"            
            onClick={() => {console.log(formik.values)}}>
            Save Changes
          </button>
        </div>
 
        <div className="card-body p-9">
          <div className="row align-items-start pb-3 mb-3">
            <label className="col-sm-2 mt-4 text-dark">{t('CD.Input.FirstName')}</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="First name"
                {...formik.getFieldProps("firstName")}
                name="firstName"
                // value={customer.firstName}
              />
            </div>

            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.LastName')}</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="last name"
                {...formik.getFieldProps("lastName")}
                name="lastName"
              />
            </div>

            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.Gender')}</label>
            <div className="col-sm-2">
              <select
                className="form-select form-control form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps('gender')}
                name="gender"  
              >
                {/* <option selected>Open this select menu</option> */}
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <option value="other">Other</option> */}
              </select>
            </div>
          </div>

          <div className="row align-items-start pb-3 mb-3">
            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.Birthdate')}</label>
            <div className="col-sm fv-row">
              <input
                type="date"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps('birthdate')}
                name="birthdate"
              />
            </div>

            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.MaritalStatus')}</label>
            <div className="col-sm fv-row">
              <select
                className="form-select form-control form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps('maritalStatus')}
                name="maritalStatus"
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
              <h4 className="fw-bolder m-0">{t('CD.Input.Address')}</h4>
            </div>
          </div>
          <div className="row align-items-start pt-3 pb-3">
            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.City')}</label>
            <div className="col-sm fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps("city")}
                name="city"
              />
            </div>
            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.ZipCode')}</label>
            <div className="col-sm fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps("zipcode")}
                name="zipcode"
              />
            </div>

            <label className="col-sm-2 text-dark mt-4"></label>
            <div className="col-sm fv-row">
              <span className="fs-6 text-muted"> </span>
            </div>
          </div>

          <div className="row align-items-start pb-3 mb-3">
            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.Country')}</label>
            <div className="col-sm fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps("country")}
                name="country"
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
      </form>
    </>
  );
};
