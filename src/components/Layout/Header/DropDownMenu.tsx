import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { MenuItems } from "../../../stack";

type MenuItem = {
  id: string;
  label: string;
  checked: boolean;
  subItems: {
    id: string;
    label: string;
    checked: boolean;
  }[];
};

const DropDownMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MenuItems);

  const handleItemClick = (itemId: string, subItemId?: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        checked: item.id === itemId,
        subItems: item.subItems.map((subItem) => ({
          ...subItem,
          checked: subItemId
            ? subItem.id === subItemId && item.id === itemId
            : false,
        })),
      }))
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <svg
            width="44px"
            height="44px"
            viewBox="0 0 80 80"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="w-6 h-6 rounded-full"
          >
            <defs>
              <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="g">
                <stop stopColor="#f906d4" offset="0%"></stop>
                <stop stopColor="#d4f906" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <rect
                id="Rectangle"
                fill="url(#g)"
                x="0"
                y="0"
                width="80"
                height="80"
              ></rect>
            </g>
          </svg>
          <span className="">E.D.I.T.H</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {menuItems.map((item) => (
          <DropdownMenuSub key={item.id}>
            <DropdownMenuSubTrigger>
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
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
