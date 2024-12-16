import { useChat } from "@/context/ChatContext";
import { useEffect, useRef } from "react";
import UserPrompt from "./UserPrompt";
import { Chat } from "@/lib/types";
import Response from "./Response";

const ChatArea = () => {
  const { chatLog } = useChat();

  const chatLogEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat log to show the latest message
    if (chatLogEndRef.current) {
      chatLogEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: 'end',
      })
    }

    if (typeof chatLog === 'string')
      localStorage.setItem('EDITH_Chatlog', chatLog);
    else localStorage.setItem('EDITH_Chatlog', JSON.stringify(chatLog));
  }, [chatLog]);

  return (
    <div className="flex flex-col w-full gap-6">
      {chatLog.map((chat: Chat, id: number) => (
        <div key={id} className="flex flex-col w-full gap-6">
          <UserPrompt prompt={chat.prompt} />
          {(chat.response !== null) && <Response response={chat.response} created={chat.created} />}
        </div>
      ))}
      <div ref={chatLogEndRef} />
    </div>
  );
};

export default ChatArea;
