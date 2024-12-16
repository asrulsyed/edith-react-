import { Chat, ChatContextType } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import OpenAI from "openai";
import { toast } from "@/hooks/use-toast";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isStartChat, setIsStartChat] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<Chat[]>([]);

  const sendMessage = async () => {
    setIsStartChat(true);
    setIsStreaming(true);

    const newChatLogEntry = { prompt: inputPrompt, response: null, created: new Date() };
    setChatLog((prevChatLog: Chat[]) => [...prevChatLog, newChatLogEntry]);

    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_API_KEY,
      baseURL: import.meta.env.VITE_BASE_URL,
      dangerouslyAllowBrowser: true,
    });

    try {
      const response = await openai.chat.completions.create({
        model: "llama3.1-8b",
        messages: [
          {
            role: "user",
            content: inputPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });
      const assistantResponse = response.choices[0].message.content;
      const created = response.created;
      
      if (assistantResponse) {
        setChatLog((prevChatLog) => {
          const updatedLog = [...prevChatLog];
          updatedLog[updatedLog.length - 1] = {
            ...updatedLog[updatedLog.length - 1],
            response: assistantResponse,
            created: new Date(created * 1000),
          };
          return updatedLog;
        });
        setInputPrompt("");
      } else {
        console.error("Error generating response");
        toast({
          variant: "destructive",
          title: "Error generating response",
        });
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI", error);
      toast({
        variant: "destructive",
        title: "Error fetching response from OpenAi",
        description: `${error}`,
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        inputPrompt,
        setInputPrompt,
        isStreaming,
        setIsStreaming,
        isStartChat,
        setIsStartChat,
        chatLog,
        setChatLog,
        sendMessage,
      }}
    >
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
