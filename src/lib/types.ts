export interface User {
  email: string;
  verify: boolean;
}

export interface AuthContextType {
  verifyCode: string | null;
  token: string | null;
  logined: boolean;
  setVerifyCode: (code: string | null) => void;
  setToken: (token: string | null) => void;
  setLogined: (logined: boolean) => void;
} 

export interface ChatContextType {
  inputPrompt: string;
  setInputPrompt: (inputPrompt: string) => void;
  isStreaming: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
  isStartChat: boolean;
  setIsStartChat: (isStartChat: boolean) => void;
  isNewChat: boolean;
  setIsNewChat: (isNewChat: boolean) => void;
  messageOver: boolean;
  setMessageOver: (messageOver: boolean) => void;
  chatLog: Chat[];
  setChatLog: (chatLog: Chat[]) => void;
  history: Session[];
  setHistory: (sessions: Session[]) => void;
  sendMessage: () => void;
  updateHistory: () => void;
  saveHistory: () => void;
}

export interface Chat {
  prompt: string;
  response: string | null;
  created: number;
}

export interface Session {
  id: number;
  session: Chat[];
}