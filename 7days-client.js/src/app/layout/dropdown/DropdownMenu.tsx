/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import {FC} from 'react'
import {Link} from 'react-router-dom'
import '../../../styles/css/color.css'
import {DropdownMenuItem} from './DropdownMenuItem'

const DropdownMenu: FC = () => {
  const { t } = useTranslation();
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6'
      data-kt-menu='true'
      style={{marginTop: "20px", backgroundColor: "#A1DDF9"}}
    >
       <DropdownMenuItem
        to='/customer-in-queue'
        title={t("SideBar.MenuItem.CIQ")}
        bbcount={10}
        bbcolor='danger'
        id="DD_CIQ"
      />

      <DropdownMenuItem
        to='/handled-customer'
        title={t("SideBar.MenuItem.HC")}
        bbcount={10}
        bbcolor='success'
        id="DD_HC"
      />

      <DropdownMenuItem
        to='/contact'
        title={t("SideBar.MenuItem.Contacts")}
        id="DD_contact"
      />    

      <DropdownMenuItem
        to='/about'
        title={t("HeaderBar.Button.About")}
        id="DD_about"
      />    

      <DropdownMenuItem
        to='/faq'
        title={t("HeaderBar.Button.FAQ")}
        id="DD_faq"
      />    
    </div>
  )
}

export {DropdownMenu}
