import {useListView} from '../../core/ListViewProvider'
import {ContactsListToolbar} from './ContactListToolbar'
import {ContactsListGrouping} from './ContactListGrouping'
import {ContactsListSearchComponent} from './ContactListSearchComponent'
import { useMediaQuery } from "react-responsive";

const ContactsListHeader = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const {selected} = useListView()
  if(isTabletOrMobile){
    return (
      <div className='card-header border-0 pt-6'>
        <ContactsListSearchComponent />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          
          {selected.length > 0 ? <ContactsListGrouping /> : <ContactsListToolbar />} :
          
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
    )
  }else{
    return (
      <div className='card-header border-0 pt-6'>
        <ContactsListSearchComponent />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
                  
          <ContactsListGrouping />
          <ContactsListToolbar />
        
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
    )
  }
}

export {ContactsListHeader}
