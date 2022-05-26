import {ID, Response} from '../../../../../resources/helpers'
export type Contact = {
  id?: ID
  firstName?: string
  lastName?: string
  gender?: string
  avatar?: string
  email?: string
  phoneNumber?: string
  address?: string
  companyID?: string
  lastInteractionAgent?: string
  lastInteractionChannel?: string
  lastInteractionAt?: Long
  isActive?: boolean
  broadcastFailedCounter?: number
  occupation?: string
  birthdate?: Long
  createdAt?: Long
  updatedAt?: Long
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
  avatar: 'avatars/300-6.jpg',
  firstName: '',
  email: '',
  role: '',
  phoneNumber: ''
}

