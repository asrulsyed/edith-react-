import { useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import MobileDropDownMenu from "./MobileDropDownMenu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="border-b-2 border-borderPrimary bg-backgroundSecondary fixed top-0 left-0 right-0 z-50">
        <div className="flex h-[72px] items-center px-4 sm:px-10 justify-between">
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
                className="rounded-lg h-10 text-lg font-medium w-[120px] whitespace-nowrap flex items-center justify-center bg-buttonPrimary hover:bg-buttonSecondary text-fontPrimary hover:text-fontSecondary border-borderPrimary hover:border-borderSecondary transition-all duration-300"
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
    </>
  );
};

export default Header;
