import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core/PageData'
import {ContactsListWrapper} from './contact-list/ContactsList'
import { useTranslation } from "react-i18next";
import db from '../../../db'


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
  
  const observerTest = db.collection('customers')
  .where("uid" ,"==", 'E5rBXFOn0cAn4wQzBsP1')
  .onSnapshot(querySnapshot => {
    console.log("Masuk observe test ======>")
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        console.log('New : customer ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified customer: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed customer: ', change.doc.data());
      }
    });
  },(error) => {
    console.log("Error observe test ======> " + error)
  });

  observerTest()
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
