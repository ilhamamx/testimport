/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../resources/helpers'
import {Contact} from '../../core/_models'

type Props = {
  contact: Contact
}

const UserInfoCell: FC<Props> = ({contact}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {contact.avatar ? (
          <div className='symbol-label'>
            <img src={toAbsoluteUrl(`/media/${contact.avatar}`)} alt={contact.firstName} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-${contact.initials?.state}`,
              `text-${contact.initials?.state}`
            )}
          >
            {contact.initials?.label}
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {contact.firstName}
      </a>
      <span>{contact.email}</span>
    </div>
  </div>
)

export {UserInfoCell}
