import TherapistContent from "../components/therapist/TherapistContent";
import TherapistRightBar from "../components/therapist/TherapistRightBar";
import TherapistSideNav from "../components/therapist/TherapistSideNav";

const TherapistDashboard = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-2">
        <TherapistSideNav />
      </div>
      <div className="lg:col-span-7">
        <TherapistContent />
      </div>
      <div className="lg:col-span-3">
        <TherapistRightBar />
      </div>
    </div>
  );
};

export default TherapistDashboard;
