import { FiCopy } from "react-icons/fi"
import { IoRefresh } from "react-icons/io5"

const Response = ({ response }: { response: string }) => {
  return (
    <div className="flex flex-col gap-4 text-fontPrimary">
      <div
        className="flex items-end px-4 bg-transparent border-none outline-none focus:outline-none"
      >
        <img src="/logo-light.png" alt="logo" className="w-[14px] h-[17px] mr-0.5" />
        <span className="text-fontPrimary text-[24px] font-bold leading-[16px]">
          .D.I.T.H
        </span>
      </div>
      <p className="text-justify">
        {response}
      </p>
      <div className="border-t border-borderPrimary">
      </div>
      <div className="flex items-center justify-between px-4">
        <button className="p-0 transition-colors duration-100 ease-linear bg-transparent border-none text-fontPrimary">
          <IoRefresh size={20} />
        </button>
        <button className="p-0 transition-colors duration-100 ease-linear bg-transparent border-none text-fontPrimary">
          <FiCopy size={20} />
        </button>
      </div>
    </div>
  )
}

export default Response