import PatientContent from "../components/patient/PatientContent";
import RightBar from "../components/patient/RightBar";
import SideNav from "../components/patient/SideNav";

const PatientDashboard = () => {
  return (
    <body className="bg-[#e8e5fe]">
    <div className="bg-white mx-auto max-w-[1280px] flex justify-between">
        <SideNav />
        <PatientContent />
        <RightBar />
    </div>
    </body>
  )
}

export default PatientDashboard;