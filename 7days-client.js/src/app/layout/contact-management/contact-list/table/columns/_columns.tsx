import {Column} from 'react-table'
import {ContactInfoCell} from './ContactInfoCell'
import {ContactEmailCell} from './ContactEmailCell'
import {ContactTwoStepsCell} from './ContactTwoStepsCell'
import {ContactActionsCell} from './ContactActionsCell'
import {ContactSelectionCell} from './ContactSelectionCell'
import {ContactCustomHeader} from './ContactCustomHeader'
import {ContactSelectionHeader} from './ContactSelectionHeader'
import {Contact} from '../../core/_models'
import {ContactPhoneNumberCell} from './ContactPhoneNumberCell'
import {ContactLastLoginCell} from './ContactLastLoginCell'
import { useTranslation } from "react-i18next";

const contactsColumns: ReadonlyArray<Column<Contact>> = [
  {
    Header: (props) => <ContactSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <ContactSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <ContactCustomHeader tableProps={props} title="Contacts.Column.Name" className='min-w-125px' />,
    id: 'firstName',
    Cell: ({...props}) => <ContactInfoCell contact={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <ContactCustomHeader tableProps={props} title="Contacts.Column.PhoneNumber" className='min-w-125px' />,
    id: 'phoneNumber',
    Cell: ({...props}) => <ContactPhoneNumberCell phoneNumber={props.data[props.row.index].phoneNumber} />,
  },
  {
    Header: (props) => (
      <ContactCustomHeader tableProps={props} title="Contacts.Column.Email" className='min-w-125px' />
    ),
    id: 'email',
    Cell: ({...props}) => <ContactEmailCell email={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => (
      <ContactCustomHeader tableProps={props} title="Contacts.Column.LastInteractions" className='min-w-125px' />
    ),
    id: 'lastInteractionAt',
    Cell: ({...props}) => <ContactLastLoginCell lastLogin={props.data[props.row.index].lastInteractionAt} />,
  },
  // {
  //   Header: (props) => (
  //     <ContactCustomHeader tableProps={props} title='Last Interactions' className='min-w-125px' />
  //   ),
  //   id: 'lastInteractionAt',
  //   Cell: ({...props}) => <ContactTwoStepsCell two_steps={props.data[props.row.index].lastInteractionAt} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
  //   ),
  //   accessor: 'joined_day',
  // },
  {
    Header: (props) => (
      <ContactCustomHeader tableProps={props} title="Contacts.Column.Actions" className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ContactActionsCell id={props.data[props.row.index].id} />,
  },
]

export {contactsColumns}
