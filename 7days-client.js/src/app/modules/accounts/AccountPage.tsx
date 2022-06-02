import React from 'react'
import {Navigate, Route, Routes, Outlet, useLocation} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../app/layout/core'
import {Overview} from './components/Overview'
import {Settings} from './components/settings/Settings'
import {AccountHeader} from './AccountHeader'
import { useTranslation } from 'react-i18next'


type Props = {
  id: string;
  name: string;
};

const AccountPage: React.FC = () => {
  const location = useLocation();
  const data = location.state as Props
  const { t } = useTranslation();
  

  const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Contacts',
      path: 'contact/list',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  
  return (
    <Routes>
      <Route
        element={
          <>
            <AccountHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='overview/*'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>{data.name}</PageTitle>
              <Overview customerID={data.id} />
            </>
          }
        />
        <Route
          path='settings/*'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              <Settings />
            </>
          }
        />
        <Route index element={<Navigate to='contact/list' />} />
      </Route>
    </Routes>
  )
}

export default AccountPage
