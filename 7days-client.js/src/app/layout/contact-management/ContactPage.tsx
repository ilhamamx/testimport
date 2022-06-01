import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core/PageData'
import {ContactsListWrapper} from './contact-list/ContactsList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Contacts',
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
//
const ContacsListPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              
              <PageTitle breadcrumbs={usersBreadcrumbs}>Contact list</PageTitle>
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
