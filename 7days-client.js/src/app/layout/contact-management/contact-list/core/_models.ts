import {ID, Response} from '../../../../../resources/helpers'
export type Contact = {
  id?: string
  firstName?: string
  lastName?: string
  gender?: string
  avatar?: string
  email?: string
  phoneNumber?: string
  address?: string
  country?: string
  state?: string
  city?: string
  zipcode?: string
  companyID?: string
  lastInteractionAgent?: string
  lastInteractionChannel?: string
  lastInteractionAt?: Date
  isActive?: boolean
  broadcastFailedCounter?: number
  occupation?: string
  birthdate?: Date
  createdAt?: Date
  updatedAt?: Date
  maritalStatus?: string
  numberOfChildren?: number
  isBroadcastConsent?: string
  role?: string
  initials?: {
    label: string
    state: string
  }
}

export type ContactsQueryResponse = Response<Array<Contact>>

export const initialContact: Contact = {
  avatar: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500',
  firstName: '',
  email: '',
  // role: '',
  phoneNumber: ''
}

