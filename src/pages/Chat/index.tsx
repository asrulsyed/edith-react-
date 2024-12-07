import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";

const Chat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <main className="flex flex-col text-sm leading-6 min-h-[calc(100vh-74px)] items-center justify-center">
      <div className="flex flex-col items-center py-20 gap-10 max-w-[730px] w-full px-4">
        <p className="text-4xl font-bold text-fontPrimary whitespace-nowrap">
          <span className="hidden sm:block">Every Day I'm Theoretically Human</span>
          <span className="sm:hidden">E.D.I.T.H</span>
        </p>        
        <div className="flex h-[82px] w-full border border-borderPrimary rounded-full bg-buttonPrimary p-[22px] justify-between gap-4">
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="rounded-full h-full w-[62px] p-0 bg-buttonPrimary border border-borderPrimary flex items-center gap-2 hover:border-borderSecondary min-w-[62px]">
              <RiOpenaiFill className="text-fontPrimary h-full w-auto rounded-full p-1 bg-backgroundPrimary" />
              <FaChevronDown className={`${isOpen ? "rotate-180" : ""} transition-all duration-300 text-fontPrimary w-3 h-3`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">

            </DropdownMenuContent>
          </DropdownMenu>

          <input type="text" className="text-fontPrimary placeholder:text-fontTertiary font-semibold text-base w-full h-full bg-transparent border-none outline-none" placeholder="Message EDITH..." />

          <button className="rounded-full p-2  flex items-center justify-center bg-buttonPrimary border-borderPrimary hover:bg-buttonSecondary text-fontPrimary hover:text-fontSecondary hover:border-borderSecondary">
            <FaArrowRight className="h-full w-auto" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Chat;
