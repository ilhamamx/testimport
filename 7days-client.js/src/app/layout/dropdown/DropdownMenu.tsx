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
        to='/unhandlechat'
        title={t("SideBar.MenuItem.CIQ")}
        bbcount={10}
        bbcolor='danger'
      />

      <DropdownMenuItem
        to='/chat'
        title={t("SideBar.MenuItem.HC")}
        bbcount={10}
        bbcolor='success'
      />

      <DropdownMenuItem
        to='/contacts'
        title={t("SideBar.MenuItem.Contacts")}
      />    

      <DropdownMenuItem
        to='/about'
        title={t("HeaderBar.Button.About")}
      />    

      <DropdownMenuItem
        to='/faq'
        title={t("HeaderBar.Button.FAQ")}
      />    
    </div>
  )
}

export {DropdownMenu}
