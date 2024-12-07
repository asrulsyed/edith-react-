import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { MenuItems } from "@/stack";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  id: string;
  label: string;
  checked: boolean;
};

const MobileDropDownMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
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
      <DropdownMenuTrigger className="text-fontPrimary rounded-full border h-10 w-10 p-2 bg-buttonPrimary hover:bg-buttonSecondary border-borderPrimary hover:text-fontSecondary transition-all duration-300 outline-none focus:outline-none">
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px] mt-[14px] bg-backgroundPrimary border-borderPrimary"
        align="end"
      >
        <div className="sm:hidden block">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex items-center justify-between py-0 h-10 text-fontPrimary hover:bg-buttonPrimary hover:text-fontSecondary transition-all duration-300 text-base"
              onClick={() => {
                handleItemClick(item.id);
                navigate(`/${item.id}`);
              }}
            >
              {item.label}
              <FaCheck
                className={`${item.checked ? "visible" : "invisible"} w-4 h-4`}
              />
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="sm:hidden block bg-borderPrimary" />
        <DropdownMenuSub>
          <DropdownMenuItem className="py-0 h-10 text-fontPrimary hover:bg-buttonPrimary hover:text-fontSecondary transition-all duration-300 text-base">
            Quests
          </DropdownMenuItem>
          <DropdownMenuItem className="py-0 h-10 text-fontPrimary hover:bg-buttonPrimary hover:text-fontSecondary transition-all duration-300 text-base">
            AI Agents
          </DropdownMenuItem>
          <DropdownMenuItem className="py-0 h-10 text-fontPrimary hover:bg-buttonPrimary hover:text-fontSecondary transition-all duration-300 text-base">
            Docs
          </DropdownMenuItem>
        </DropdownMenuSub>
        <DropdownMenuSeparator className="bg-borderPrimary" />
        <DropdownMenuItem
          className="flex items-center justify-between py-0 h-10 text-fontPrimary hover:bg-buttonPrimary hover:text-fontSecondary transition-all duration-300 text-base"
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
