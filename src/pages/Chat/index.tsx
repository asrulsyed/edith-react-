import { Outlet, useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex gap-4 px-4 mt-2">
        <button className="h-10 flex items-center justify-center" onClick={() => navigate("/chat/llm-chat")}>LLM Chat</button>
        <button className="h-10 flex items-center justify-center" onClick={() => navigate("/chat/settings")}>Settings</button>
        <button className="h-10 flex items-center justify-center" onClick={() => navigate("/chat/project")}>Project</button>
        <button className="h-10 flex items-center justify-center" onClick={() => navigate("/chat/history")}>History</button>
      </div>
      <Outlet />
    </div>
  )
}

export default Chat;