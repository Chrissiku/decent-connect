import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Client from "./pages/Client";
import Organization from "./pages/Organization";
import Psychologist from "./pages/Psychologist";
import { useContext } from "react";
import { AppContext } from "./context/ContextProvider";
export default function App() {
  const { userType } = useContext(AppContext);
  const PageComponent =
    userType === "organization"
      ? Organization
      : userType === "client"
      ? Client
      : userType === "psychologist"
      ? Psychologist
      : Home;
  return (
    <>
      <div>
        <div className="w-full mx-auto flex flex-col">
          <Routes>
            <Route path="/" element={<PageComponent />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
