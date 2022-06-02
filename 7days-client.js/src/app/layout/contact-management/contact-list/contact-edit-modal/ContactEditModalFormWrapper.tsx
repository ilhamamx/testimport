import {useQuery} from 'react-query'
import {ContactEditModalForm} from './ContactEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../resources/helpers'
import {useListView} from '../core/ListViewProvider'
import {getContactById} from '../core/_requests'

const ContactEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      console.log("get contact by id "+itemIdForUpdate);
      return getContactById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <ContactEditModalForm isUserLoading={isLoading} contact={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <ContactEditModalForm isUserLoading={isLoading} contact={user} />
  }

  return null
}

export {ContactEditModalFormWrapper}
