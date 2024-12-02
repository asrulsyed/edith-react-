import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex flex-col text-sm leading-6 min-h-[calc(100vh-64px)] items-center justify-center">
      <div className="grid justify-center py-20 sm:grid-cols-2 items-center gap-10 sm:gap-3 md:gap-10 max-w-[800px] w-full p-4">
        <NavLink
          to={"/chat"}
          className="flex w-full h-40 p-6 text-lg transition-colors duration-300 ease-in-out border border-borderColor rounded-md font-pavelt text-fontHover bg-bgColor hover:bg-bgHover max-w-[600px]"
        >
          Chat
        </NavLink>
        <NavLink
          to={"/image"}
          className="flex w-full h-40 p-6 text-lg transition-colors duration-300 ease-in-out border border-borderColor rounded-md font-pavelt text-fontHover bg-bgColor hover:bg-bgHover max-w-[600px]"
        >
          Text to Image
        </NavLink>
        <NavLink
          to={"/video"}
          className="flex w-full h-40 p-6 text-lg transition-colors duration-300 ease-in-out border border-borderColor rounded-md font-pavelt text-fontHover bg-bgColor hover:bg-bgHover max-w-[600px]"
        >
          Text to Video
        </NavLink>
        <NavLink
          to={"/audio"}
          className="flex w-full h-40 p-6 text-lg transition-colors duration-300 ease-in-out border border-borderColor rounded-md font-pavelt text-fontHover bg-bgColor hover:bg-bgHover max-w-[600px]"
        >
          Text to Audio
        </NavLink>
      </div>
    </main>
  );
};

export default Home;
