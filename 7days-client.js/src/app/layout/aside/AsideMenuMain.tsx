/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {

  return (
    <>
      <AsideMenuItem
        to='/unhandlechat'
        icon='/media/icons/duotune/communication/com002.svg'
        title='Customer in Queue'
        fontIcon='bi-app-indicator'
        bbcount={10}
        bbcolor='danger'
      />
      <AsideMenuItem
        to='/chat'
        icon='/media/icons/duotune/communication/com010.svg'
        title='Handled Customer'
        fontIcon='bi-layers'
        bbcount={9}
        bbcolor='success'
      />
      <AsideMenuItem
        to='/contacts'
        icon='/media/icons/duotune/communication/com005.svg'
        title='Contacts'
        fontIcon='bi-layers'
      />
    </>
  )
}
