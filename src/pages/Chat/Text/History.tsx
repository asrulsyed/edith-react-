import Response from "@/components/Chat/Response";
import UserPrompt from "@/components/Chat/UserPrompt";
import { useChat } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { updateHistory, history } = useChat();
  const [sessionId, setSessionId] = useState<number>(history[0]?.id);

  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  return (
    <main className="fixed top-[114px] left-0 right-0 bottom-0 flex font-Sofia text-mainFont">
      <div className="max-w-[260px] bg-headerBg w-full border-r-2 border-primaryBorder flex flex-col relative items-start px-5">
        <div className="text-subButtonFont text-xl py-5">Chat History</div>
        <div className="pl-3 text-left flex flex-col gap-2">
          {history.map((session) => (
            <div
              key={session.id}
              onClick={() => setSessionId(session.id)}
              className={`${session.id === sessionId ? 'bg-inputBg border-tertiaryBorder text-mainFont' : 'border-secondaryBorder text-subButtonFont hover:bg-inputBg hover:border-tertiaryBorder hover:text-mainFont'} h-10 border-l-2 pl-2 flex items-center justify-start group rounded-lg transition-colors duration-200 relative `}
            >
              <p className="truncate w-[200px]">{session.session[0].prompt}</p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-inputBg pl-2 hidden group-hover:flex gap-1 items-center">
                <button className="bg-inputBg p-1 border-none hover:scale-105">
                  <FiEdit3 size={20} />
                </button>
                <button className="bg-inputBg p-1 border-none hover:scale-105">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-hoverFont text-nowrap bg-buttonFont hover:bg-buttonHoverBg hover:border-transparent hover:scale-105 focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            navigate("/chat/text");
            updateHistory();
          }}
        >
          Start New Chat
        </button>
      </div>
      <div className="w-full flex flex-col items-center  overflow-y-auto">
        <div className="max-w-[730px] my-[30px] mb-[50px] flex flex-col gap-8">
          {history.find(session => session.id === sessionId)?.session.map((chat) => (
            <div key={chat.created} className="flex flex-col gap-5">
              <UserPrompt prompt={chat.prompt} />
              {chat.response !== null && <Response response={chat.response} />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default History;
