import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Image from "./pages/Image";
import Video from "./pages/Video";
import Audio from "./pages/Audio";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import { ToastProvider } from "./components/ui/toast";
import RequireAuth from "./components/Auth/RequireAuth";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Verify from "./pages/Auth/Verify";
import VerifyToken from "./pages/Auth/VerifyToken";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Chat />} />
                <Route path="/chat" element={<Chat />}></Route>
                <Route path="/image" element={RequireAuth(<Image />)}></Route>
                <Route path="/video" element={RequireAuth(<Video />)}></Route>
                <Route path="/audio" element={RequireAuth(<Audio />)}></Route>
                <Route path="user">
                  <Route path="signup" element={<SignUp />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="verify" element={<Verify />} />
                  <Route path="verify-token" element={<VerifyToken />} />
                </Route>
                <Route path="*" element={<NotFound />} />
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
