import { ChatContextType, Message } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [genType, setGenType] = useState<string>("text");
  const [isStartChat, setIsStartChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // setMessages(localStorage.getItem('chatHistory'))
  }, [])

  return (
    <ChatContext.Provider value={{ genType, setGenType, isStartChat, setIsStartChat, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
