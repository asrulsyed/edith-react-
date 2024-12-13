import ChatArea from "@/components/ChatArea";
import InputBox from "@/components/InputBox";
import { useChat } from "@/context/ChatContext";

const Text = () => {
  const { isStartChat } = useChat();

  return (
    <main className="flex flex-col justify-center items-center min-h-[calc(100vh-74px)] text-sm leading-6 font-chakraPetch">
      <div className="flex flex-col items-center gap-10 sm:gap-20 px-4 py-20 w-full max-w-[730px]">
        {!isStartChat ? (
          <p className="font-bold  text-3xl text-fontPrimary whitespace-nowrap">
            <span className="sm:block hidden">
              Every Day I'm Theoretically Human
            </span>
            <div className="flex sm:hidden items-end border-none outline-none focus:outline-none p-0 justify-center">
              <img
                src="/logo-light.png"
                alt="logo"
                className="w-[30px] h-[35px] mr-0.5"
              />
              <span className="text-[48px] font-bold leading-[33px]">
                .D.I.T.H
              </span>
            </div>
          </p>
        ) : (
          <ChatArea />
        )}
        <InputBox />
      </div>
    </main>
  );
};

export default Text;
