import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core/PageData'
import {ContactsListWrapper} from './contact-list/ContactsList'
import { useTranslation } from "react-i18next";

const ContacsListPage = () => {
  const { t } = useTranslation();
  const usersBreadcrumbs: Array<PageLink> = [
    {
      title: t('Contact.BC.ContactList'),
      path: '/contact/list',
      isSeparator: false,
      isActive: false,
    }
    ,
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Contact.BC.ContactList')}</PageTitle>
              <ContactsListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/contact/list' />} />
    </Routes>
  )
}

export default ContacsListPage
