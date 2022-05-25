import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ContactsListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {ContactEditModal} from './user-edit-modal/UserEditModal'
import {KTCard} from '../../../../resources/helpers/components/KTCard';

const UsersList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ContactsListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <ContactEditModal />}
    </>
  )
}

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UsersListWrapper}
