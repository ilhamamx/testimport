/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect, useState} from 'react'
import {AsideMenuItem} from './AsideMenuItem'
import {useTranslation} from "react-i18next";
import { useSelector} from "react-redux";
import {RootState} from '../../../setup/redux/store'

export function AsideMenuMain() {
  const { t } = useTranslation();
  const countUnreadMessages: number = useSelector((state: RootState) => state.Chat.countTotalUnreadMessages);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  
  useEffect(() => {
    setUnreadMessages(countUnreadMessages)
  })

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
        bbcount={countUnreadMessages}
        bbcolor='success'
        id='AM_HC'
      />
      <AsideMenuItem
        to='/contact/list'
        icon='/media/icons/duotune/communication/com005.svg'
        title={t("SideBar.MenuItem.Contacts")}
        fontIcon='bi-layers'
        id='AM_contact'
      />
    </>
  )
}
