import {DocumentReference} from "@firebase/firestore-types"
export interface BadgeItem {
  unreadCount: number,
  className: string,
  channel: string
}

export interface Customer {
  firstName: string,
  lastName: string,
  lastInteractionAt: string,
  avatar: ImageBitmap
  id: string
}

export interface HandledMessageListItem {
    id: string,
    fullName: string,
    image: string,
    lastMessages: string,
    unreadMessages: BadgeItem[],
    lastActivityAt: Date,
    customer?: DocumentReference,
    customerModel?: Customer,
    lastInteractionChannel: string
}