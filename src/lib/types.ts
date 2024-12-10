export interface User {
  email: string;
  verify: boolean;
}

export interface AuthContextType {
  // user: User | null;
  token: string | null;
  logined: boolean;
  setToken: (token: string | null) => void;
  // setUser: (user: User | null) => void;
  setLogined: (logined: boolean) => void;
} 

export interface ChatContextType {
  genType: string | "text";
  setGenType: (genType: string) => void;
}

export interface Message {
  role: string;
  content: string;
  timeStamp: Date;
}
