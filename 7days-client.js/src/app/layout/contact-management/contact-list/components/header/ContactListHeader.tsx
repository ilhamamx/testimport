import {useListView} from '../../core/ListViewProvider'
import {ContactsListToolbar} from './ContactListToolbar'
import {ContactsListGrouping} from './ContactListGrouping'
import {ContactsListSearchComponent} from './ContactListSearchComponent'

const ContactsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ContactsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ContactsListGrouping /> : <ContactsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ContactsListHeader}
