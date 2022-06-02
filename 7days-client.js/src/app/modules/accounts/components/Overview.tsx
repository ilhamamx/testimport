/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import {Link} from 'react-router-dom'
import { getCustomerByID } from '../../../../db'
import {KTSVG} from '../../../../resources/helpers'
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from '../../../../resources/partials/widgets'
import { Contact } from '../../../layout/contact-management/contact-list/core/_models'

export const Overview  = ( {customerID} : {customerID: string}) => {

  // const customer: Contact = getCustomerByID(id).then((doc) => {
  //  customer = doc;
  // });
  let customer;
  getCustomerByID(customerID).then((doc) => {
    console.log("get customer by id "+JSON.stringify(doc))
    customer = doc as Contact
    console.log("Test : "+JSON.stringify(customer))
    // return doc;
  });

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='#' className='btn btn-primary align-self-center'>
            Edit Profil
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row align-items-start'>
            <label className='col-sm text-muted'>First Name</label>
            <div className='col-sm'>
              <span className='fs-6 text-dark'>Max</span>
            </div>

            <label className='col-sm text-muted'>Last Name</label>
            <div className='col-sm'>
              <span className='fs-6 text-dark'>Smith</span>
            </div>

            <label className='col-sm text-muted'>Gender</label>
            <div className='col-sm'>
              <span className='fs-6 text-dark'>Male</span>
            </div>
            
          </div>

          <div className='row align-items-start'>
            <label className='col-sm text-muted'>Birthdate</label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'>May, 29 1999</span>
            </div>

            <label className='col-sm text-muted'>Marietal Status</label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'>Single</span>
            </div>

            <label className='col-sm text-muted'></label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'> </span>
            </div>
          </div>

          <div className='card-title m-0'>
            <h4 className='fw-bolder m-0'>Address</h4>
            
          </div>
          <div className='row align-items-start'>
            <label className='col-sm text-muted'>City</label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'>Surabaya</span>
            </div>

            <label className='col-sm text-muted'>Zip Code</label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'>60236</span>
            </div>

            <label className='col-sm text-muted'></label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'> </span>
            </div>
          </div>

          <div className='row align-items-start'>
            <label className='col-sm text-muted'>Country</label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'>Indonesia</span>
            </div>

            <label className='col-sm text-muted'></label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'> </span>
            </div>

            <label className='col-sm text-muted'></label>
            <div className='col-sm fv-row'>
              <span className='fw-bold fs-6'> </span>
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
  )
}
