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
      {/* {chatLog.map} */}
      <div ref={chatLogEndRef} />
    </div>
  );
};

export default ChatArea;
