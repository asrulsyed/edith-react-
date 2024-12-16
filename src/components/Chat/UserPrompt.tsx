import { useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
const UserPrompt = ({ prompt }: { prompt: string }) => {
  useEffect(() => {
      console.log("prompt")
    }, [])
  
  return (
    <div className="flex items-start justify-between h-full gap-4 p-4 rounded-lg iw-full bg-backgroundSecondary group text-fontPrimary">
      <span className="flex-1 text-base text-justify">{prompt}</span>
      <button className="p-0 text-transparent transition-colors duration-100 ease-linear bg-transparent border-none group-hover:text-fontPrimary">
        <FiEdit3 size={20} />
      </button>
    </div>
  )
}

export default UserPrompt