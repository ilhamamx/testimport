export interface Notification {
  notifType: 'newMessage'
  name: string
  phoneNumber: string
  avatar: string
  channel?: string
  createdAt?: any
  state: 'primary' | 'danger' | 'warning' | 'success' | 'info'
}

export const defaultNotifcation: Array<Notification> = [
  {
    notifType: 'newMessage',
    name: 'Fikri Cghuv',
    phoneNumber: '6281332442654',
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23M_znL-cMefe1j2TURdIxBSY71-X7WpxUg&usqp=CAU",
    channel: "tokopedia",
    createdAt: new Date(),
    state: 'primary',
  },
  {
    notifType: 'newMessage',
    name: 'Agnes Monica',
    phoneNumber: '6281332452354',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23M_znL-cMefe1j2TURdIxBSY71-X7WpxUg&usqp=CAU',
    channel: "blibli",
    createdAt: new Date(),
    state: 'primary',
  }
]