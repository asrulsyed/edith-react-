import ChatArea from "@/components/Chat/ChatArea";
import InputBox from "@/components/InputBox";
import { useChat } from "@/context/ChatContext";
import { useEffect } from "react";

const Text = () => {
  const { isStartChat } = useChat();

  useEffect(() => {
    console.log("ids", isStartChat)
  }, [isStartChat])
  
  return (
    <main className={`${isStartChat ? 'flex justify-center' : ' flex justify-center items-center h-full'} font-Sofia text-mainFont`}>
      <div className="flex flex-col items-center gap-10 sm:gap-20 px-4 w-full max-w-[730px] mt-[140px] mb-[120px]">
        {!isStartChat ? (
          <div className="text-3xl font-bold whitespace-nowrap">
            <span className="hidden sm:block">
              Every Day I'm Theoretically Human
            </span>
            <div className="flex items-end justify-center p-0 border-none outline-none sm:hidden focus:outline-none">
              <img
                src="/logo-light.png"
                alt="logo"
                className="w-[30px] h-[35px] mr-0.5"
              />
              <span className="text-[48px] font-bold leading-[33px]">
                .D.I.T.H
              </span>
            </div>
          </div>
        ) : (
          <ChatArea />
        )}
        <InputBox />
      </div>
    </main>
  );
};

export default Text;
