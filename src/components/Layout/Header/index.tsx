import { useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import MobileDropDownMenu from "./MobileDropDownMenu";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const leftSidebarRef = useRef<HTMLDivElement | null>(null);
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const [isLeftSidebar, setIsLeftSidebar] = useState<boolean>(false);
  const [isRightSidebar, setIsRightSidebar] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        leftSidebarRef.current &&
        !leftSidebarRef.current.contains(event.target as Node) &&
        isLeftSidebar
      ) {
        setIsLeftSidebar(false);
      }

      if (
        rightSidebarRef.current &&
        !rightSidebarRef.current.contains(event.target as Node) &&
        isRightSidebar
      ) {
        setIsRightSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLeftSidebar, isRightSidebar]);

  return (
    <>
      <header className="border-b-2 border-borderPrimary bg-backgroundSecondary fixed top-0 left-0 right-0 z-50">
        <div className="flex h-[72px] items-center px-4 sm:px-10 justify-between relative">
          <div className="flex items-center gap-10">
            <button
              className="flex items-center gap-1.5 bg-backgroundSecondary border-none outline-none focus:outline-none p-0"
              onClick={() => navigate("/")}
            >
              <img src="/logo.png" alt="logo" className="w-9 h-9" />
              <h1 className="text-fontPrimary text-2xl font-bold font-pavelt">
                E.D.I.T.H
              </h1>
            </button>
            <div className="hidden sm:flex">
              <DropDownMenu />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-4">
              <button className="h-8 flex items-center justify-center text-base bg-buttonPrimary hover:bg-buttonSecondary text-fontPrimary hover:text-fontSecondary border-borderPrimary hover:border-borderSecondary transition-all duration-300">
                Quests
              </button>
              <button className="h-8 flex items-center justify-center text-base bg-buttonPrimary hover:bg-buttonSecondary text-fontPrimary hover:text-fontSecondary border-borderPrimary hover:border-borderSecondary transition-all duration-300">
                AI Agents
              </button>
              <button className="h-8 flex items-center justify-center text-base bg-buttonPrimary hover:bg-buttonSecondary text-fontPrimary hover:text-fontSecondary border-borderPrimary hover:border-borderSecondary transition-all duration-300">
                Docs
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate("/user/signin")}
                className="rounded-lg h-10 text-lg font-medium w-[120px] whitespace-nowrap flex items-center justify-center bg-buttonTertiary hover:bg-buttonQuaternary text-fontSecondary border-borderPrimary hover:border-borderPrimary transition-all duration-300"
              >
                Log In
              </button>
            </div>
          </div>
          <div className="lg:hidden">
            <MobileDropDownMenu />
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <div ref={leftSidebarRef} className="fixed top-[74px] left-0 flex">
        <div
          className={`${
            isLeftSidebar
              ? "w-[260px] h-[calc(100vh-74px)]  bg-backgroundSecondary border-r border-borderPrimary z-50 scale-100 opacity-100"
              : "scale-0 opacity-0 origin-left"
          }  transition-all duration-150 ease-out`}
        ></div>
        <button
          className={`${
            isLeftSidebar
              ? "h-full -translate-x-[calc(100%+1px)] rounded-bl-lg border-r-transparent"
              : "rounded-br-lg border-l-transparent"
          } bg-buttonPrimary p-1 border-borderPrimary  border-t-transparent rounded-none hover:border-borderSecondary focus:outline-none z-[51] transition-all duration-150 ease-out`}
          onClick={() => {
            setIsLeftSidebar(!isLeftSidebar);
            setIsRightSidebar(false);
          }}
        >
          {isLeftSidebar ? (
            <RiMenuFoldLine className="text-fontPrimary w-5 h-5" />
          ) : (
            <RiMenuUnfoldLine className="text-fontPrimary w-5 h-5" />
          )}
        </button>
      </div>

      {/* Right Sidebar */}
      <div ref={rightSidebarRef} className="fixed top-[74px] right-0 flex">
        <button
          className={`${
            isRightSidebar
              ? "h-full translate-x-[calc(100%+1px)] rounded-br-lg border-l-transparent"
              : "rounded-bl-lg border-r-transparent"
          } bg-buttonPrimary p-1 border-borderPrimary  border-t-transparent rounded-none hover:border-borderSecondary focus:outline-none z-[51] transition-all duration-150 ease-out`}
          onClick={() => {
            setIsRightSidebar(!isRightSidebar);
            setIsLeftSidebar(false);
            console.log("dddde");
          }}
        >
          {isRightSidebar ? (
            <RiMenuUnfoldLine className="text-fontPrimary w-5 h-5" />
          ) : (
            <RiMenuFoldLine className="text-fontPrimary w-5 h-5" />
          )}
        </button>
        <div
          className={`${
            isRightSidebar
              ? "w-[260px] h-[calc(100vh-74px)]  bg-backgroundSecondary border-l border-borderPrimary z-50 scale-100 opacity-100"
              : "scale-0 opacity-0 origin-right"
          }  transition-all duration-150 ease-out`}
        ></div>
      </div>
    </>
  );
};

export default Header;
