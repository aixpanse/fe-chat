export interface Message {
  type: "human" | "ai";
  content: string;
}

export interface Order {
  orderDetails: string;
  readyDate: string;
  readyTime: string;
  contactDetails: string;
  isRead: boolean;
}

export interface UserMessage {
  messageContent: string;
  sender: string;
  isRead: boolean;
}
