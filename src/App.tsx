import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CodeVerify, TokenVerify } from "./components/Auth/RequireAuth";
import Layout from "./components/Layout";
import { ToastProvider } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Verify from "./pages/Auth/Verify";
import VerifyLink from "./pages/Auth/VerifyLink";
import Audio from "./pages/Chat/Audio";
import Image from "./pages/Chat/Image";
import Text from "./pages/Chat/Text";
import Video from "./pages/Chat/Video";
import NotFound from "./pages/NotFound";
import "./App.css";
import Code from "./pages/Code";
import Coming from "./pages/Coming";
import ConfirmToken from "./pages/Auth/ConfirmToken";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route path="" element={<Navigate to="/chat" replace />} />
                <Route path="code" element={<Code />} />
                <Route path="coming" element={<Coming />} />
                <Route path="chat" element={CodeVerify(<Layout />)}>
                  <Route
                    path=""
                    element={<Navigate to="/chat/text" replace />}
                  />
                  <Route path="text" element={<Text />} />
                  <Route path="image" element={TokenVerify(<Image />)} />
                  <Route path="audio" element={TokenVerify(<Audio />)} />
                  <Route path="video" element={TokenVerify(<Video />)} />
                </Route>
                <Route path="user">
                  <Route
                    path=""
                    element={<Navigate to="/user/signin" replace />}
                  />
                  <Route path="signup" element={CodeVerify(<SignUp />)} />
                  <Route path="signin" element={CodeVerify(<SignIn />)} />
                  <Route path="verify" element={CodeVerify(<Verify />)} />
                  <Route path="confirm" element={CodeVerify(<ConfirmToken />)} />
                  <Route path="verify-invite" element={<VerifyLink />} />
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
