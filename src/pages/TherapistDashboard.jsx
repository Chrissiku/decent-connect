import TherapistContent from "../components/therapist/TherapistContent"
import TherapistRightBar from "../components/therapist/TherapistRightBar"
import TherapistSideNav from "../components/therapist/TherapistSideNav"

const TherapistDashboard = () => {
  return (
   <body className="bg-[#e8e5fe]">
    <div className="bg-white mx-auto max-w-[1280px] flex justify-between">
        <TherapistSideNav />
        <TherapistContent />
        <TherapistRightBar />
    </div>
    </body>
  )
}

export default TherapistDashboard