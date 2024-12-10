export interface User {
  email: string;
  verify: boolean;
}

export interface AuthContextType {
  // user: User | null;
  verifyCode: string | null;
  token: string | null;
  logined: boolean;
  setVerifyCode: (code: string | null) => void;
  setToken: (token: string | null) => void;
  // setUser: (user: User | null) => void;
  setLogined: (logined: boolean) => void;
} 

export interface ChatContextType {
  genType: string | "text";
  setGenType: (genType: string) => void;
  isStartChat: boolean;
  setIsStartChat: (isStartChat: boolean) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export interface Message {
  role: string;
  content: string;
  timeStamp: Date;
}
