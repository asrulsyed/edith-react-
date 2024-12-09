import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CodeVerify, TokenVerify } from "./components/Auth/RequireAuth";
import Layout from "./components/Layout";
import { ToastProvider } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import ConfirmToken from "./pages/Auth/ConfirmToken";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Verify from "./pages/Auth/Verify";
import Audio from "./pages/Chat/Audio";
import Image from "./pages/Chat/Image";
// import Text from "./pages/Chat/Text";
import Video from "./pages/Chat/Video";
import NotFound from "./pages/NotFound";
import "./App.css";
import Code from "./pages/Code";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route path="" element={<Navigate to="/chat" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="code" element={<Code />} />
                <Route path="chat" element={CodeVerify(<Layout />)}>
                  <Route
                    path=""
                    element={<Navigate to="/chat/text" replace />}
                  />
                  {/* <Route path="text" element={TokenVerify(<Text />)} /> */}
                  <Route path="text" element={TokenVerify(<Home />)} />
                  <Route path="image" element={TokenVerify(<Image />)} />
                  <Route path="audio" element={TokenVerify(<Audio />)} />
                  <Route path="video" element={TokenVerify(<Video />)} />
                </Route>
                <Route path="user">
                  <Route
                    path=""
                    element={<Navigate to="/user/signin" replace />}
                  />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="verify" element={<Verify />} />
                  <Route path="confirm" element={<ConfirmToken />} />
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
