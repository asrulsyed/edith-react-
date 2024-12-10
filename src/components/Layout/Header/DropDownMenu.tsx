import { useEffect, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { MenuItems } from "../../../stack";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  id: string;
  label: string;
  checked: boolean;
  // subItems: {
  //   id: string;
  //   label: string;
  //   checked: boolean;
  // }[];
};

const DropDownMenu = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState<MenuItem[]>(MenuItems);
  const [menuTitle, setMenuTitle] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const handleItemClick = (itemId: string, subItemId?: string) => {
  //   setMenuItems((prevItems) =>
  //     prevItems.map((item) => ({
  //       ...item,
  //       checked: item.id === itemId,
  //       subItems: item.subItems.map((subItem) => ({
  //         ...subItem,
  //         checked: subItemId
  //           ? subItem.id === subItemId && item.id === itemId
  //           : false,
  //       })),
  //     }))
  //   );
  // };

  const handleItemClick = (itemId: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        checked: item.id === itemId,
      }))
    );
  };

  useEffect(() => {
    setMenuTitle(menuItems.find((item) => item.checked)?.label);
  }, [menuItems]);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex justify-between items-center bg-buttonPrimary px-3 border border-borderPrimary hover:border-borderSecondary rounded-lg w-[160px] h-10 text-fontPrimary text-xl focus:outline-none">
        <span className="flex-1 text-center leading-none">{menuTitle}</span>
        <FaChevronDown
          className={`${
            isOpen ? "rotate-180" : ""
          } transition-all duration-150`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-buttonPrimary mt-[14px] border-borderPrimary w-[160px]"
        align="start"
      >
        {menuItems.map((item) => (
          <DropdownMenuSub key={item.id}>
            <DropdownMenuCheckboxItem
              checked={item.checked}
              onCheckedChange={() => {
                handleItemClick(item.id);
                navigate(`/chat/${item.id}`);
              }}
              className="text-fontPrimary hover:bg-buttonSecondary flex items-center justify-between px-3 py-2 [&>span]:hidden text-md text-center"
            >
              <p className="flex-1">{item.label}</p>
              <FaCheck
                className={`${item.checked ? "visible" : "invisible"} w-4 h-4`}
              />
            </DropdownMenuCheckboxItem>
            {/* <DropdownMenuSubTrigger>
              <DropdownMenuCheckboxItem
                checked={item.checked}
                onCheckedChange={() => handleItemClick(item.id)}
                onSelect={(e) => e.preventDefault()}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {item.subItems.map((subItem) => (
                <DropdownMenuCheckboxItem
                  key={subItem.id}
                  checked={subItem.checked}
                  onCheckedChange={() => handleItemClick(item.id, subItem.id)}
                >
                  {subItem.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuSubContent> */}
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
