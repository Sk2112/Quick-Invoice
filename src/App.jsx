import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import { Toaster } from "react-hot-toast";
import UserSyncHandler from "./components/UserSyncHandler";
import {
  RedirectToSignIn,
  RedirectToSignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <UserSyncHandler />
        <Menubar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>

                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/generate"
            element={
              <>
                <SignedIn>
                  <MainPage />
                </SignedIn>

                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/preview"
            element={
              <>
                <SignedIn>
                  <Preview />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
