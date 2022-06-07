import {KTSVG} from '../../../../../resources/helpers'
import {useListView} from '../core/ListViewProvider'
import { useTranslation } from "react-i18next";

const ContactEditModalHeader = () => {
  const {setItemIdForUpdate} = useListView()
  const { t } = useTranslation();

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{t("Contacts.Button.AddUser")}</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {ContactEditModalHeader}
