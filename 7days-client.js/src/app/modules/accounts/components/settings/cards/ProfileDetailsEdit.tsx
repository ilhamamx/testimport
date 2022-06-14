/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { KTSVG } from "../../../../../../resources/helpers";
// import {
//   ChartsWidget1,
//   TablesWidget1,
//   ListsWidget5,
//   TablesWidget5,
// } from "../../../../../../resources/partials/widgets";
// import {toAbsoluteUrl} from '../../../../../../resources/helpers'
// import { profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {  Contact } from "../../../../../layout/contact-management/contact-list/core/_models";
import { updateContact } from "../../../../../layout/contact-management/contact-list/core/_requests";
import { useListView } from "../../../../../layout/contact-management/contact-list/core/ListViewProvider";
import { useQueryResponse } from "../../../../../layout/contact-management/contact-list/core/QueryResponseProvider";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

// type Props = {
//   isUserLoading: boolean;
//   contact: Contact;
// };

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
  // const customerGender = (customerData.gender === 'female' ?  t('CD.Options.Female') : t('CD.Options.Male')) 

  console.log("customersss ==>> " + customer.id);

  const [contactForEdit] = useState({
    // ...contact,
    id: customer.id,
    avatar: customer.avatar,
    firstName: customer.firstName,
    lastName: customer.lastName? customer.lastName : '',
    gender: customer.gender? customer.gender : '',
    birthdate: customer.birthdate,
    maritalStatus: customer.maritalStatus? customer.maritalStatus : '' , 
    city: customer.city? customer.city : '' ,
    zipcode: customer.zipcode? customer.zipcode : '',
    country: customer.country? customer.country : '',
    firstNameInsensitive: "",
    updatedAt: new Date()
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
          values.updatedAt = new Date()
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
            onClick={() => {console.log(formik.values)}}
            disabled={!formik.isValid || !formik.touched}>
            {t('CD.Button.SaveChanges')}
          </button>
        </div>
 
        <div className="card-body p-9">
          <div className="row align-items-start pb-3 mb-3">
            <label className="required col-sm-2 mt-4 text-dark">{t('CD.Input.FirstName')}</label>
            <div className="col-sm-2">
              <input
                type="text"
                // className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder={t("CD.Input.FirstName")}
                {...formik.getFieldProps("firstName")}
                name="firstName"
                className={clsx(
                  "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                  {
                    "is-invalid":
                      formik.touched.firstName && formik.errors.firstName,
                  },
                  {
                    "is-valid":
                      formik.touched.firstName && !formik.errors.firstName,
                  }
                )}
                autoComplete="off"
                disabled={formik.isSubmitting}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{t('CD.Error.FirstName')}</span>
                  </div>
                </div>
              )}
            </div>

            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.LastName')}</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder={t('CD.Input.LastName')}
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
               <option value=''>{t('CD.PH.Gender')} . . .</option>
               { customerData.gender === 'male' ?  <option value="male"  selected > {t('CD.Option.Male')} </option> :  <option value="male" > {t('CD.Option.Male')} </option> }
               { customerData.gender === 'female' ?  <option value="female"  selected > {t('CD.Option.Female')} </option> :  <option value="female" > {t('CD.Option.Female')} </option> }
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
              {formik.touched.birthdate && formik.errors.birthdate && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{t('CD.Error.Birthdate')}</span>
                  </div>
                </div>
              )}
            </div>

            <label className="col-sm-2 text-dark mt-4">{t('CD.Input.MaritalStatus')}</label>
            <div className="col-sm fv-row">
              <select
                className="form-select form-control form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps('maritalStatus')}
                name="maritalStatus"
              >
                {/* <option selected>Open this select menu</option> */}
                {/* <option value="single">{t('CD.Option.Single')}</option>
                <option value="married">{t('CD.Option.Married')}</option> */}
                <option value=''>{t('CD.PH.MarietalStatus')} . . .</option>
                { customerData.maritalStatus === 'single' ?  <option value="single"  selected > {t('CD.Option.Single')} </option> :  <option value="single" > {t('CD.Option.Single')} </option> }
               { customerData.maritalStatus === 'married' ?  <option value="married"  selected > {t('CD.Option.Married')} </option> :  <option value="married" > {t('CD.Option.Married')} </option> }
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
              {/* <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                {...formik.getFieldProps("country")}
                name="country"
              /> */}
              <select
                  className='form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('country')}
                  name="country"
                >
                  <option value=''>{t('CD.PH.Country')}...</option>
                  <option value='AF'>Afghanistan</option>
                  <option value='AX'>Aland Islands</option>
                  <option value='AL'>Albania</option>
                  <option value='DZ'>Algeria</option>
                  <option value='AS'>American Samoa</option>
                  <option value='AD'>Andorra</option>
                  <option value='AO'>Angola</option>
                  <option value='AI'>Anguilla</option>
                  <option value='AQ'>Antarctica</option>
                  <option value='AG'>Antigua and Barbuda</option>
                  <option value='AR'>Argentina</option>
                  <option value='AM'>Armenia</option>
                  <option value='AW'>Aruba</option>
                  <option value='AU'>Australia</option>
                  <option value='AT'>Austria</option>
                  <option value='AZ'>Azerbaijan</option>
                  <option value='BS'>Bahamas</option>
                  <option value='BH'>Bahrain</option>
                  <option value='BD'>Bangladesh</option>
                  <option value='BB'>Barbados</option>
                  <option value='BY'>Belarus</option>
                  <option value='BE'>Belgium</option>
                  <option value='BZ'>Belize</option>
                  <option value='BJ'>Benin</option>
                  <option value='BM'>Bermuda</option>
                  <option value='BT'>Bhutan</option>
                  <option value='BO'>Bolivia, Plurinational State of</option>
                  <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                  <option value='BA'>Bosnia and Herzegovina</option>
                  <option value='BW'>Botswana</option>
                  <option value='BV'>Bouvet Island</option>
                  <option value='BR'>Brazil</option>
                  <option value='IO'>British Indian Ocean Territory</option>
                  <option value='BN'>Brunei Darussalam</option>
                  <option value='BG'>Bulgaria</option>
                  <option value='BF'>Burkina Faso</option>
                  <option value='BI'>Burundi</option>
                  <option value='KH'>Cambodia</option>
                  <option value='CM'>Cameroon</option>
                  <option value='CA'>Canada</option>
                  <option value='CV'>Cape Verde</option>
                  <option value='KY'>Cayman Islands</option>
                  <option value='CF'>Central African Republic</option>
                  <option value='TD'>Chad</option>
                  <option value='CL'>Chile</option>
                  <option value='CN'>China</option>
                  <option value='CX'>Christmas Island</option>
                  <option value='CC'>Cocos (Keeling) Islands</option>
                  <option value='CO'>Colombia</option>
                  <option value='KM'>Comoros</option>
                  <option value='CG'>Congo</option>
                  <option value='CD'>Congo, the Democratic Republic of the</option>
                  <option value='CK'>Cook Islands</option>
                  <option value='CR'>Costa Rica</option>
                  <option value='CI'>Côte d'Ivoire</option>
                  <option value='HR'>Croatia</option>
                  <option value='CU'>Cuba</option>
                  <option value='CW'>Curaçao</option>
                  <option value='CY'>Cyprus</option>
                  <option value='CZ'>Czech Republic</option>
                  <option value='DK'>Denmark</option>
                  <option value='DJ'>Djibouti</option>
                  <option value='DM'>Dominica</option>
                  <option value='DO'>Dominican Republic</option>
                  <option value='EC'>Ecuador</option>
                  <option value='EG'>Egypt</option>
                  <option value='SV'>El Salvador</option>
                  <option value='GQ'>Equatorial Guinea</option>
                  <option value='ER'>Eritrea</option>
                  <option value='EE'>Estonia</option>
                  <option value='ET'>Ethiopia</option>
                  <option value='FK'>Falkland Islands (Malvinas)</option>
                  <option value='FO'>Faroe Islands</option>
                  <option value='FJ'>Fiji</option>
                  <option value='FI'>Finland</option>
                  <option value='FR'>France</option>
                  <option value='GF'>French Guiana</option>
                  <option value='PF'>French Polynesia</option>
                  <option value='TF'>French Southern Territories</option>
                  <option value='GA'>Gabon</option>
                  <option value='GM'>Gambia</option>
                  <option value='GE'>Georgia</option>
                  <option value='DE'>Germany</option>
                  <option value='GH'>Ghana</option>
                  <option value='GI'>Gibraltar</option>
                  <option value='GR'>Greece</option>
                  <option value='GL'>Greenland</option>
                  <option value='GD'>Grenada</option>
                  <option value='GP'>Guadeloupe</option>
                  <option value='GU'>Guam</option>
                  <option value='GT'>Guatemala</option>
                  <option value='GG'>Guernsey</option>
                  <option value='GN'>Guinea</option>
                  <option value='GW'>Guinea-Bissau</option>
                  <option value='GY'>Guyana</option>
                  <option value='HT'>Haiti</option>
                  <option value='HM'>Heard Island and McDonald Islands</option>
                  <option value='VA'>Holy See (Vatican City State)</option>
                  <option value='HN'>Honduras</option>
                  <option value='HK'>Hong Kong</option>
                  <option value='HU'>Hungary</option>
                  <option value='IS'>Iceland</option>
                  <option value='IN'>India</option>
                  <option value='ID'>Indonesia</option>
                  <option value='IR'>Iran, Islamic Republic of</option>
                  <option value='IQ'>Iraq</option>
                  <option value='IE'>Ireland</option>
                  <option value='IM'>Isle of Man</option>
                  <option value='IL'>Israel</option>
                  <option value='IT'>Italy</option>
                  <option value='JM'>Jamaica</option>
                  <option value='JP'>Japan</option>
                  <option value='JE'>Jersey</option>
                  <option value='JO'>Jordan</option>
                  <option value='KZ'>Kazakhstan</option>
                  <option value='KE'>Kenya</option>
                  <option value='KI'>Kiribati</option>
                  <option value='KP'>Korea, Democratic People's Republic of</option>
                  <option value='KW'>Kuwait</option>
                  <option value='KG'>Kyrgyzstan</option>
                  <option value='LA'>Lao People's Democratic Republic</option>
                  <option value='LV'>Latvia</option>
                  <option value='LB'>Lebanon</option>
                  <option value='LS'>Lesotho</option>
                  <option value='LR'>Liberia</option>
                  <option value='LY'>Libya</option>
                  <option value='LI'>Liechtenstein</option>
                  <option value='LT'>Lithuania</option>
                  <option value='LU'>Luxembourg</option>
                  <option value='MO'>Macao</option>
                  <option value='MK'>Macedonia, the former Yugoslav Republic of</option>
                  <option value='MG'>Madagascar</option>
                  <option value='MW'>Malawi</option>
                  <option value='MY'>Malaysia</option>
                  <option value='MV'>Maldives</option>
                  <option value='ML'>Mali</option>
                  <option value='MT'>Malta</option>
                  <option value='MH'>Marshall Islands</option>
                  <option value='MQ'>Martinique</option>
                  <option value='MR'>Mauritania</option>
                  <option value='MU'>Mauritius</option>
                  <option value='YT'>Mayotte</option>
                  <option value='MX'>Mexico</option>
                  <option value='FM'>Micronesia, Federated States of</option>
                  <option value='MD'>Moldova, Republic of</option>
                  <option value='MC'>Monaco</option>
                  <option value='MN'>Mongolia</option>
                  <option value='ME'>Montenegro</option>
                  <option value='MS'>Montserrat</option>
                  <option value='MA'>Morocco</option>
                  <option value='MZ'>Mozambique</option>
                  <option value='MM'>Myanmar</option>
                  <option value='NA'>Namibia</option>
                  <option value='NR'>Nauru</option>
                  <option value='NP'>Nepal</option>
                  <option value='NL'>Netherlands</option>
                  <option value='NC'>New Caledonia</option>
                  <option value='NZ'>New Zealand</option>
                  <option value='NI'>Nicaragua</option>
                  <option value='NE'>Niger</option>
                  <option value='NG'>Nigeria</option>
                  <option value='NU'>Niue</option>
                  <option value='NF'>Norfolk Island</option>
                  <option value='MP'>Northern Mariana Islands</option>
                  <option value='NO'>Norway</option>
                  <option value='OM'>Oman</option>
                  <option value='PK'>Pakistan</option>
                  <option value='PW'>Palau</option>
                  <option value='PS'>Palestinian Territory, Occupied</option>
                  <option value='PA'>Panama</option>
                  <option value='PG'>Papua New Guinea</option>
                  <option value='PY'>Paraguay</option>
                  <option value='PE'>Peru</option>
                  <option value='PH'>Philippines</option>
                  <option value='PN'>Pitcairn</option>
                  <option value='PL'>Poland</option>
                  <option value='PT'>Portugal</option>
                  <option value='PR'>Puerto Rico</option>
                  <option value='QA'>Qatar</option>
                  <option value='RE'>Réunion</option>
                  <option value='RO'>Romania</option>
                  <option value='RU'>Russian Federation</option>
                  <option value='RW'>Rwanda</option>
                  <option value='BL'>Saint Barthélemy</option>
                  <option value='SH'>Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value='KN'>Saint Kitts and Nevis</option>
                  <option value='LC'>Saint Lucia</option>
                  <option value='MF'>Saint Martin (French part)</option>
                  <option value='PM'>Saint Pierre and Miquelon</option>
                  <option value='VC'>Saint Vincent and the Grenadines</option>
                  <option value='WS'>Samoa</option>
                  <option value='SM'>San Marino</option>
                  <option value='ST'>Sao Tome and Principe</option>
                  <option value='SA'>Saudi Arabia</option>
                  <option value='SN'>Senegal</option>
                  <option value='RS'>Serbia</option>
                  <option value='SC'>Seychelles</option>
                  <option value='SL'>Sierra Leone</option>
                  <option value='SG'>Singapore</option>
                  <option value='SX'>Sint Maarten (Dutch part)</option>
                  <option value='SK'>Slovakia</option>
                  <option value='SI'>Slovenia</option>
                  <option value='SB'>Solomon Islands</option>
                  <option value='SO'>Somalia</option>
                  <option value='ZA'>South Africa</option>
                  <option value='GS'>South Georgia and the South Sandwich Islands</option>
                  <option value='KR'>South Korea</option>
                  <option value='SS'>South Sudan</option>
                  <option value='ES'>Spain</option>
                  <option value='LK'>Sri Lanka</option>
                  <option value='SD'>Sudan</option>
                  <option value='SR'>Suriname</option>
                  <option value='SJ'>Svalbard and Jan Mayen</option>
                  <option value='SZ'>Swaziland</option>
                  <option value='SE'>Sweden</option>
                  <option value='CH'>Switzerland</option>
                  <option value='SY'>Syrian Arab Republic</option>
                  <option value='TW'>Taiwan, Province of China</option>
                  <option value='TJ'>Tajikistan</option>
                  <option value='TZ'>Tanzania, United Republic of</option>
                  <option value='TH'>Thailand</option>
                  <option value='TL'>Timor-Leste</option>
                  <option value='TG'>Togo</option>
                  <option value='TK'>Tokelau</option>
                  <option value='TO'>Tonga</option>
                  <option value='TT'>Trinidad and Tobago</option>
                  <option value='TN'>Tunisia</option>
                  <option value='TR'>Turkey</option>
                  <option value='TM'>Turkmenistan</option>
                  <option value='TC'>Turks and Caicos Islands</option>
                  <option value='TV'>Tuvalu</option>
                  <option value='UG'>Uganda</option>
                  <option value='UA'>Ukraine</option>
                  <option value='AE'>United Arab Emirates</option>
                  <option value='GB'>United Kingdom</option>
                  <option value='US'>United States</option>
                  <option value='UY'>Uruguay</option>
                  <option value='UZ'>Uzbekistan</option>
                  <option value='VU'>Vanuatu</option>
                  <option value='VE'>Venezuela, Bolivarian Republic of</option>
                  <option value='VN'>Vietnam</option>
                  <option value='VI'>Virgin Islands</option>
                  <option value='WF'>Wallis and Futuna</option>
                  <option value='EH'>Western Sahara</option>
                  <option value='YE'>Yemen</option>
                  <option value='ZM'>Zambia</option>
                  <option value='ZW'>Zimbabwe</option>
                </select>
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
