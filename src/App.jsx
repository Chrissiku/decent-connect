import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDashboard from "./pages/PatientDashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
