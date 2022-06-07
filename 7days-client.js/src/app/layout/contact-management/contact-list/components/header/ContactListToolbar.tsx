import {KTSVG} from '../../../../../../resources/helpers/components/KTSVG'
import {useListView} from '../../core/ListViewProvider'
import {ContactsListFilter} from './ContactListFilter'
import { useTranslation } from "react-i18next";

const ContactsListToolbar = () => {
  const { t } = useTranslation();
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <ContactsListFilter /> */}

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        {t("Contacts.Button.Export")}
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {t("Contacts.Button.AddUser")}
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {ContactsListToolbar}
