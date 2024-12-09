import { ChatContextType } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [genType, setGenType] = useState<string>("text");

  return (
    <ChatContext.Provider value={{ genType, setGenType }}>
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
