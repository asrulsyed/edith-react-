import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaChevronDown, FaSpinner } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";

const InputBox = () => {
  const TEXTAREA_MIN_HEIGHT = "36px";
  const TEXTAREA_MAX_HEIGHT = "100px";

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageOver, setMessageOver] = useState<boolean>(false);
  const [isbottom, setIsbottom] = useState<boolean>(false);
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    setIsbottom(true);
    setIsStreaming(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/generate`,
        {prompt: message}
      );
      if (res.status === 200) console.log("aaa", res)
    }
    catch(error) {
      console.error("error", error)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    adjustTextareaHeight();

    const textWidth = newMessage.length * 8;
    setMessageOver(textWidth > textareaWidth * 0.7);
  };

  useEffect(() => {
    setTextareaWidth(textareaRef.current?.clientWidth || 0)
  }, [])

  return (
    <div
      className={`${
        isbottom ? "fixed bottom-5 max-w-[730px]" : ""
      } flex flex-wrap justify-between items-center gap-4 bg-buttonPrimary p-[21px] border border-borderPrimary rounded-[40px] w-full`}
    >
      <div
        className={`${
          messageOver ? "order-0 basis-full" : "order-1"
        } flex-grow`}
      >
        <textarea
          ref={textareaRef}
          className="bg-transparent pt-2 border-none w-full h-[36px] font-semibold text-base text-fontPrimary placeholder:text-fontTertiary overflow-y-hidden outline-none resize-none"
          placeholder="Message EDITH..."
          onKeyDown={keyDownHandler}
          value={message}
          onChange={(e) => handleChange(e)}
          translate="no"
          style={{
            minHeight: TEXTAREA_MIN_HEIGHT,
            maxHeight: TEXTAREA_MAX_HEIGHT,
          }}
        />
      </div>
      <div className={`${messageOver ? "order-1" : "order-0"}`}>
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-buttonPrimary p-0 border border-borderPrimary hover:border-borderSecondary rounded-full w-[62px] min-w-[62px] h-9">
            <RiOpenaiFill className="bg-backgroundPrimary p-1 rounded-full w-auto h-full text-fontPrimary" />
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
          className="flex justify-center items-center bg-buttonPrimary hover:bg-buttonSecondary p-2 border-borderPrimary hover:border-borderSecondary rounded-full w-9 h-9 text-fontPrimary hover:text-fontSecondary"
          onClick={() => {
            if (textareaRef.current) {
              textareaRef.current.style.height = TEXTAREA_MIN_HEIGHT;
            }
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
