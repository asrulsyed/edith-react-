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
  chatLog: Chat[];
  setChatLog: (chatLog: Chat[]) => void;
  sendMessage: () => void;
}

export interface Chat {
  prompt: string;
  response: string | null;
  created: Date;
}