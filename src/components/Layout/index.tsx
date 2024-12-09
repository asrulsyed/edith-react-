import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ChatProvider } from "@/context/ChatContext";
import InputBox from "./InputBox";

const Layout = () => {
  return (
    <ChatProvider>
      <Header />
      <main className="flex flex-col justify-center items-center min-h-[calc(100vh-74px)] text-sm leading-6">
        <div className="flex flex-col items-center gap-20 px-4 py-20 w-full max-w-[730px]">
          <Outlet />
          <InputBox />
        </div>
      </main>
    </ChatProvider>
  );
};

export default Layout;
