import React from 'react'
import {ProfileDetails} from './cards/ProfileDetails'
import {SignInMethod} from './cards/SignInMethod'
import {ConnectedAccounts} from './cards/ConnectedAccounts'
import {EmailPreferences} from './cards/EmailPreferences'
import {Notifications} from './cards/Notifications'
import {DeactivateAccount} from './cards/DeactivateAccount'
import { Contact } from '../../../../layout/contact-management/contact-list/core/_models'
import { ProfileDetailsEdit } from './cards/ProfileDetailsEdit'

export function Settings({customer} : {customer: Contact}) {
  const customerData: Contact = customer
  return (
    <>
    {/* <h1>settings</h1> */}
      {/* <ProfileDetails customer={customerData}/> */}
      <ProfileDetailsEdit customer={customerData}/>
      {/* <SignInMethod />
      <ConnectedAccounts />
      <EmailPreferences />
      <Notifications />
      <DeactivateAccount /> */}
    </>
  )
}
