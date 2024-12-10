const Home = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center text-black">
      <div className="max-w-screen-lg -translate-y-1/4 px-10 ">
        <p className="font-bold font-pavelt text-center text-4xl sm:text-[48px] lg:text-[50px] mb-5">E.D.I.T.H</p>
        <p className="font-bold text-5xl sm:text-[64px] lg:text-[80px] text-center mb-8">COMING SOON!</p>
        <p className="text-xl sm:text-[28px] text-center leading-loose">
          EDITH is a groundbreaking Web3-based AI ecosystem that combines
          blockchain technology, decentralized collaboration, and intelligent
          automation to create the future of Artificial Intelligence.
        </p>
      </div>
      <div className="fixed bottom-16 w-full flex items-center justify-center gap-8 sm:gap-16">
        <a
          className="hover:cursor-pointer hover:scale-105"
          href="https://t.me/edithx_ai"
        >
          <img src="/telegram.png" className="w-10 h-10 sm:w-16 sm:h-16" />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105"
          href="https://discord.gg/ss4p3nyBKP"
        >
          <img src="/discord.png" className="w-10 h-10 sm:w-16 sm:h-16" />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105"
          href="https://x.com/edithAPP"
        >
          <img src="/twitter-dark.png" className="w-10 h-10 sm:w-16 sm:h-16" />
        </a>
        <a
          className="hover:cursor-pointer hover:scale-105"
          href="https://edithx.ai/"
        >
          <img src="/website.png" className="w-10 h-10 sm:w-16 sm:h-16" />
        </a>
      </div>
    </div>
  );
};

export default Home;
