import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChat } from "@/context/ChatContext";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaChevronDown, FaSpinner } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";

const InputBox = () => {
  const TEXTAREA_MIN_HEIGHT = "36px";
  const TEXTAREA_MAX_HEIGHT = "100px";

  const {
    isStartChat,
    sendMessage,
    setInputPrompt,
    isStreaming,
    inputPrompt,
  } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messageOver, setMessageOver] = useState<boolean>(false);
  const [textareaWidth, setTextareaWidth] = useState<number>(0);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = TEXTAREA_MIN_HEIGHT;
      textarea.style.height = `${Math.min(
        textarea.scrollHeight,
        parseInt(TEXTAREA_MAX_HEIGHT)
      )}px`;
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey &&  !isStreaming) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setInputPrompt(newPrompt);
    adjustTextareaHeight();

    const textWidth = newPrompt.length * 8;
    setMessageOver(textWidth > textareaWidth * 0.8);
  };

  useEffect(() => {
    console.log("inputBox");
    setTextareaWidth(textareaRef.current?.clientWidth || 0);
  }, []);

  return (
    <div
      className={`${
        isStartChat ? "fixed bottom-5 max-w-[730px] left-1/2 -translate-x-1/2" : ""
      } flex flex-nowrap sm:flex-wrap justify-between items-center gap-4 bg-buttonPrimary p-[21px] border border-borderPrimary rounded-[40px] w-full`}
    >
      <div
        className={`${
          messageOver ? "order-0 basis-full" : "order-1"
        } flex-grow`}
      >
        <textarea
          ref={textareaRef}
          className={`${isStreaming ? 'text-fontTertiary' : "text-fontPrimary"} bg-transparent pt-2 border-none w-full h-[36px] font-semibold text-base  placeholder:text-fontTertiary overflow-y-hidden outline-none resize-none`}
          placeholder="Message EDITH..."
          onKeyDown={keyDownHandler}
          value={inputPrompt}
          onChange={(e) => handleChange(e)}
          translate="no"
          disabled={isStreaming}
          style={{
            minHeight: TEXTAREA_MIN_HEIGHT,
            maxHeight: TEXTAREA_MAX_HEIGHT,
          }}
        />
      </div>
      <div className={`${messageOver ? "order-1" : "order-0"}`}>
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-buttonPrimary p-0 border border-borderPrimary hover:border-borderSecondary rounded-full w-[62px] min-w-[62px] h-9">
            <RiOpenaiFill className="w-auto h-full p-1 rounded-full bg-backgroundPrimary text-fontPrimary" />
            <FaChevronDown
              className={`${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 text-fontPrimary w-3 h-3`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start"></DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="order-2">
        <button
          className="flex items-center justify-center p-2 rounded-full bg-buttonPrimary hover:bg-buttonSecondary border-borderPrimary hover:border-borderSecondary w-9 h-9 text-fontPrimary hover:text-fontSecondary"
          onClick={(e) => {
            if (textareaRef.current) {
              textareaRef.current.style.height = TEXTAREA_MIN_HEIGHT;
            }
            e.preventDefault()
            sendMessage();
          }}
        >
          {isStreaming ? (
            <FaSpinner className="w-auto h-full animate-spin" />
          ) : (
            <FaArrowRight className="w-auto h-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputBox;
