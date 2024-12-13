import { useChat } from "@/context/ChatContext";
import { useEffect, useRef } from "react";

const ChatArea = () => {
  const { chatLog } = useChat();

  const chatLogEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat log to show the latest message
    // if (chatLogEndRef.current) {
    //   chatLogEndRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //   });
    // }
  }, [chatLog]);

  return (
    <div>
      {chatLog.map((chat, id) => (
        <div key={id}>
          <div className="mb-2">{chat.prompt}</div>
          <div>{chat.response}</div>
        </div>
      ))}
      <div ref={chatLogEndRef} />
    </div>
  );
};

export default ChatArea;
