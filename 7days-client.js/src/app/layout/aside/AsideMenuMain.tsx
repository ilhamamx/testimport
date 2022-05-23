/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {AsideMenuItem} from './AsideMenuItem'
import {useTranslation} from "react-i18next";

export function AsideMenuMain() {
  const { t } = useTranslation();
  return (
    <>
      <AsideMenuItem
        to='/customer-in-queue'
        icon='/media/icons/duotune/communication/com002.svg'
        title={t("SideBar.MenuItem.CIQ")}
        fontIcon='bi-app-indicator'
        bbcount={10}
        bbcolor='danger'
        id='AM_CIQ'
      />
      <AsideMenuItem
        to='/handled-customer'
        icon='/media/icons/duotune/communication/com010.svg'
        title={t("SideBar.MenuItem.HC")}
        fontIcon='bi-layers'
        bbcount={9}
        bbcolor='success'
        id='AM_HQ'
      />
      <AsideMenuItem
        to='/contact'
        icon='/media/icons/duotune/communication/com005.svg'
        title={t("SideBar.MenuItem.Contacts")}
        fontIcon='bi-layers'
        id='AM_contact'
      />
    </>
  )
}
