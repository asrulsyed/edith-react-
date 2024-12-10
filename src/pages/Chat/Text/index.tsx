import InputBox from "@/components/InputBox";
import { useChat } from "@/context/ChatContext";

const Text = () => {
  const { isStartChat } = useChat();

  return (
    <main className="flex flex-col justify-center items-center min-h-[calc(100vh-74px)] text-sm leading-6">
      <div className="flex flex-col items-center gap-20 px-4 py-20 w-full max-w-[730px]">
        {isStartChat ? (
          <p className="font-bold font-pavelt text-3xl text-fontPrimary whitespace-nowrap">
            <span className="sm:block hidden">
              Every Day I'm Theoretically Human
            </span>
            <span className="sm:hidden">E.D.I.T.H</span>
          </p>
        ) : (
          <></>
        )}
        <InputBox />
      </div>
    </main>
  );
};

export default Text;
