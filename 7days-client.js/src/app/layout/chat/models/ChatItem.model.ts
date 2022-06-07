export interface BadgeItem {
  unreadCount: number,
  className: string,
  channel: string
}

export interface Customer {
  profile_name: string,
  lastInteractionAt: string
}

export interface HandledMessageListItem {
    id: string;
    fullName: string;
    image: string;
    lastMessages: string;
    unreadMessages?: BadgeItem[];
    lastActivityAt: Date;
    customer: Customer
}