import { Chat, ChatContextType, Session } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import OpenAI from "openai";
import { toast } from "@/hooks/use-toast";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [messageOver, setMessageOver] = useState<boolean>(false);
  const [isStartChat, setIsStartChat] = useState<boolean>(false);
  const [isNewChat, setIsNewChat] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<Chat[]>([]);
  const [history, setHistory] = useState<Session[]>([]);

  const sendMessage = async () => {
    setIsStartChat(true);
    setIsStreaming(true);

    const newChatLogEntry = {
      prompt: inputPrompt,
      response: null,
      created: Date.now(),
    };
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
            role: "system",
            content: import.meta.env.VITE_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: inputPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });
      const assistantResponse = response.choices[0].message.content;

      if (assistantResponse) {
        setChatLog((prevChatLog) => {
          const updatedLog = [...prevChatLog];
          updatedLog[updatedLog.length - 1] = {
            ...updatedLog[updatedLog.length - 1],
            response: assistantResponse,
          };
          return updatedLog;
        });
        setInputPrompt("");
        setMessageOver(false);
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

  const updateHistory = () => {
    setIsStartChat(false);
    setChatLog([])
  };

  const saveHistory = () => {
    if (chatLog.length) {
      const newSession = {
        id: chatLog[0].created,
        session: chatLog
      }
      if (history.length) {
        console.log("a")
        setHistory((prev) => {
          const existingSessionIndex = prev.findIndex(session => session.id === newSession.id);

          if (existingSessionIndex !== -1) {
            const updatedHistory = [...prev];
            updatedHistory[existingSessionIndex] = newSession;
            return updatedHistory;
          } else {
            return [...prev, newSession]
          }
        })
      } else {
        setHistory((prev) => [...prev, newSession])
      }
    }
    
    localStorage.setItem('EDITH_History', JSON.stringify(history))
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("EDITH_History")
    if (savedHistory) setHistory(JSON.parse(savedHistory))
  }, [])

  return (
    <ChatContext.Provider
      value={{
        inputPrompt,
        setInputPrompt,
        isStreaming,
        setIsStreaming,
        isStartChat,
        setIsStartChat,
        isNewChat,
        setIsNewChat,
        messageOver,
        setMessageOver,
        chatLog,
        setChatLog,
        history,
        setHistory,
        sendMessage,
        updateHistory,
        saveHistory,
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
