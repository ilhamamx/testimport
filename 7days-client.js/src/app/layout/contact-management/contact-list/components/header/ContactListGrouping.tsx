import {useQueryClient, useMutation} from 'react-query'
import {QUERIES} from '../../../../../../resources/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedContacts} from '../../core/_requests'
import { useTranslation } from "react-i18next";

const ContactsListGrouping = () => {
  const { t } = useTranslation();
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedContacts(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      clearSelected()
    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center me-3'>
      <div className='fw-bolder me-5'>
        {selected.length > 0 ? <span className='me-2'>{selected.length} {t('Contacts.Info.Selected')}</span> : null}
       
      </div>

      {selected.length > 0 ? <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        {t("Contacts.Button.DeleteSelected")}
      </button> : <button
        type='button'
        className='btn btn-danger' disabled
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        {t("Contacts.Button.DeleteSelected")}
      </button>}
      
    </div>
  )
}

export {ContactsListGrouping}
