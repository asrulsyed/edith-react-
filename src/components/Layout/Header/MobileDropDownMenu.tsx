import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItems } from "@/stack";

type MenuItem = {
  id: string;
  label: string;
  checked: boolean;
};

const MobileDropDownMenu = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MenuItems);

  const handleItemClick = (itemId: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        checked: item.id === itemId,
      }))
    );
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="bg-buttonPrimary hover:bg-buttonSecondary p-2 border border-borderPrimary rounded-full w-10 h-10 text-fontPrimary hover:text-fontSecondary transition-all duration-300 focus:outline-none outline-none">
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-backgroundPrimary mt-[14px] border-borderPrimary w-[200px]"
        align="end"
      >
        <div className="block sm:hidden">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex justify-between items-center hover:bg-buttonPrimary py-0 h-10 text-base text-fontPrimary hover:text-fontSecondary transition-all duration-300"
              onClick={() => {
                handleItemClick(item.id);
                navigate(`/chat/${item.id}`);
              }}
            >
              {item.label}
              <FaCheck
                className={`${item.checked ? "visible" : "invisible"} w-4 h-4`}
              />
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="block sm:hidden bg-borderPrimary" />
        <DropdownMenuSub>
          <DropdownMenuItem className="hover:bg-buttonPrimary py-0 h-10 text-base text-fontPrimary hover:text-fontSecondary transition-all duration-300">
            Quests
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-buttonPrimary py-0 h-10 text-base text-fontPrimary hover:text-fontSecondary transition-all duration-300">
            AI Agents
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-buttonPrimary py-0 h-10 text-base text-fontPrimary hover:text-fontSecondary transition-all duration-300">
            Docs
          </DropdownMenuItem>
        </DropdownMenuSub>
        <DropdownMenuSeparator className="bg-borderPrimary" />
        <DropdownMenuItem
          className="flex justify-between items-center hover:bg-buttonPrimary py-0 h-10 text-base text-fontPrimary hover:text-fontSecondary transition-all duration-300"
          onClick={() => {
            navigate("/user/signin");
          }}
        >
          Log In
          <CiLogin className="" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileDropDownMenu;
