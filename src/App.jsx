import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDashboard from "./pages/PatientDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/therapist-dashboard" element={< TherapistDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
