import {ID, Response,toAbsoluteUrl} from '../../../../../resources/helpers'
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
  company?: string
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
  avatar: toAbsoluteUrl("/media/icons/avatar/def-avatar.png"),
  firstName: '',
  email: '',
  // role: '',
  phoneNumber: '',
}

