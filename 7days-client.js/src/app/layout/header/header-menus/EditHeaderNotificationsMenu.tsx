/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl, defaultAlerts, defaultLogs} from '../../../../resources/helpers'

const EditHeaderNotificationsMenu: FC = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-500px w-lg-375px'  //350   375
    data-kt-menu='true'
  >
    <div className="alert mt-0 mb-0" role="alert">
          <div className="d-flex mt-0 flex-fill w-auto">
            <div className="ps-3">
              <span>Today, 11:25</span>
            </div>
          </div>  
        <div className="d-flex align-items-center">    
          <div className="symbol symbol-50px symbol-circle me-10 mb-10">
            <div className="symbol-label"
                  style={{
                  backgroundImage: `url('${toAbsoluteUrl(
                  "/media/avatars/300-6.jpg"
                      )}')`,
                  }}></div>
          </div>        
            <div className="px-2 pt-2">
              <p className="alert-heading"> Receive a Message from Fikri Cghuv </p>{" "}
            </div>            
            <div className="align-text-bottom list-inline mb-4 mb-lg-1 d-flex flex-row justify-content-end flex-fill w-auto ">
              <button
                type="button"
                className="btn btn-primary btn-sm align-text-bottom p-7 pt-1 pb-1 mt-2"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
  </div>
)

export {EditHeaderNotificationsMenu}
