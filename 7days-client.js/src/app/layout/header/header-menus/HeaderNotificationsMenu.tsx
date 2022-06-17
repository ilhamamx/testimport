/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl, defaultAlerts, defaultLogs} from '../../../../resources/helpers'
import { defaultNotifcation } from "../../../modules/notify/Notification/model"
import Avatar from "../../../../styles/components/Avatar"
import {NotificationListHeader} from "../NotificationListHeader"

const HeaderNotificationsMenu: FC = () => 
{

  return (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
    // style={{transform: "translate(-20px, 61px)"}}
    data-kt-menu='true'
  >
    <div className='d-flex flex-column bgi-no-repeat rounded-top'
      style={{backgroundColor: "#150958"}}>
      <h3 className='text-white fw-bold px-9 mt-10 mb-6'>
        Notifications 
        {/* <span className='fs-8 opacity-75 ps-3'>24 reports</span> */}
      </h3>

      <ul className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9'>
        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_1'
          >
            Alerts
          </a>
        </li>

        {/* <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4 active'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_2'
          >
            Updates
          </a>
        </li>

        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_3'
          >
            Logs
          </a>
        </li> */}
      </ul>
    </div>
    {/* <p>test notif</p> */}
    <div className='tab-content'>
    <div className='tab-pane fade' id='kt_topbar_notifications_1' role='tabpanel'>
    <div className='scroll-y mh-325px my-5 px-8'>
      <NotificationListHeader />
      </div>
      </div>
    </div>
  </div>
)}

export {HeaderNotificationsMenu}
