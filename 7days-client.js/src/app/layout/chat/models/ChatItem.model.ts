export interface BadgeItem {
  unreadCount: number,
  className: string,
  channel: string
}


export interface HandledMessageListItem {
    id: string;
    fullName: string;
    image: string;
    mail: string;
    unreadMessages?: BadgeItem[];
    lastActivityAt: Date;
}