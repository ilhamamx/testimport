/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../resources/helpers'
import { toAbsoluteUrl } from "../../../resources/helpers/AssetHelpers";
import {AsideMenu} from './AsideMenu'
import '../../../styles/css/color.css';


const AsideDefault: FC = () => {

  return (
    <div
      id='kt_aside'
      className='aside cl-gray'
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto colorblue'  id='kt_aside_logo'>
        {/* begin::Aside toggler */}
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <img
              alt='Logo'
              className='h-25px logo'
              style={{paddingLeft:"5px"}}
              src={toAbsoluteUrl('/media/icons/duotune/general/gen001.svg')}
            />
            <div className='logo' style={{paddingLeft:"15px", paddingRight:"55px"}}> Hide Menubar</div>            
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      
      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu />
      </div>
      {/* end::Aside menu */}

    </div>
  )
}

export {AsideDefault}
