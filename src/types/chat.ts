export type Message = {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
};

export type ChatState = {
  messages: Message[];
  isLoading: boolean;
};
