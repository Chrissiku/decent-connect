import { Link } from "react-router-dom"
import { Squares2X2Icon, CalendarDaysIcon, UserPlusIcon, DocumentTextIcon, UserIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid"
import logoPatient from "../../assets/patient/logo.svg"

const SideNav = () => {
    return (
        <nav className="bg-[#F7F6FE] w-[150px] border border-r-[#DBDAE5] p-4">
            <div className="mb-20">
                <img src={logoPatient} className="h-16" alt="Decent connect" />
            </div>
            <div className="flex flex-col gap-[220px] text-base text-[#F66E49]">
                <div className="flex flex-col gap-[35px]">
                    <Link to="#" className="flex gap-1">
                        <span><Squares2X2Icon className="w-[20px] h-[20px]" /></span>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="#" className="flex gap-1">
                        <span><CalendarDaysIcon className="w-[20px] h-[20px]" /></span>
                        <span>Appointment</span>
                    </Link>
                    <Link to="#" className="flex gap-1">
                        <span><UserPlusIcon className="w-[20px] h-[20px]" /></span>
                        <span>Therapist</span>
                    </Link>
                    <Link to="#" className="flex gap-1">
                        <span><DocumentTextIcon className="w-[20px] h-[20px]" /></span>
                        <span>Reports</span>
                    </Link>
                </div>
                <div className="flex flex-col justify-end gap-8 mt-auto" >
                    <Link to="#" className="flex gap-1">
                        <span><UserIcon className="w-[20px] h-[20px]" /></span>
                        <span>Account</span>
                    </Link>
                    <Link to="#" className="flex gap-1">
                        <span><ArrowLeftStartOnRectangleIcon className="w-[20px] h-[20px]" /></span>
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default SideNav