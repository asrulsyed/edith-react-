import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Image from "./pages/Image";
import Video from "./pages/Video";
import Audio from "./pages/Audio";
import ShortFilmGen from "./pages/Video/ShortFilmGen";
import VideoPodcast from "./pages/Video/VideoPodcast";
import NormalImgGen from "./pages/Image/NormalImgGen";
import NormalConversation from "./pages/Audio/NormalConversation";
import AudioPodcast from "./pages/Audio/AudioPodcast";
import LLMChat from "./pages/Chat/LLMChat";
import Settings from "./pages/Chat/Settings";
import Project from "./pages/Chat/Project";
import History from "./pages/Chat/History";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Verify from "./pages/Auth/Verify";
import { AuthProvider } from "./context/AuthContext";
import VerifyToken from "./pages/Auth/VerifyToken";
import RequireAuth from "./components/Auth/RequireAuth";
import { Toaster } from "./components/ui/toaster";
import { ToastProvider } from "./components/ui/toast";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/home" element={RequireAuth(<Home />)} />
                <Route path="/chat" element={RequireAuth(<Chat />)}>
                  <Route index element={<Navigate to="llm-chat" replace />} />
                  <Route path="llm-chat" element={<LLMChat />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="project" element={<Project />} />
                  <Route path="history" element={<History />} />
                </Route>
                <Route path="/image" element={RequireAuth(<Image />)}>
                  <Route
                    index
                    element={<Navigate to="normal-img-gen" replace />}
                  />
                  <Route path="normal-img-gen" element={<NormalImgGen />} />
                </Route>
                <Route path="/video" element={<Video />}>
                  <Route
                    index
                    element={<Navigate to="short-film-gen" replace />}
                  />
                  <Route path="short-film-gen" element={<ShortFilmGen />} />
                  <Route path="podcast" element={<VideoPodcast />} />
                </Route>
                <Route path="/audio" element={RequireAuth(<Audio />)}>
                  <Route
                    index
                    element={<Navigate to="normal-conversation" replace />}
                  />
                  <Route
                    path="normal-conversation"
                    element={<NormalConversation />}
                  />
                  <Route path="podcast" element={<AudioPodcast />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/user">
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="verify" element={<Verify />} />
                <Route path="verify/token" element={<VerifyToken />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default App;
