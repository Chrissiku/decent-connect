import { DocumentDuplicateIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import male from '../../assets/patient/male.svg'
import { UserGroupIcon, UserIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import counselling from "../../assets/patient/Marriage counseling-bro.png"
import { PlusIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"


const TherapistRightBar = () => {
    return (
        <div className="bg-[#F7F6FE] w-full border border-l-[#DBDAE5]">
            <div className="px-3 flex flex-col gap-10">
                {/* Profile */}
                <div className="flex text-[#9E9E9E] mt-5">
                    <div className="bg-white p-2 font-medium text-base flex w-[270px]">
                        <p className="mr-3">EiArQgMv...UXpnIn19</p>
                        <span><DocumentDuplicateIcon className="w-[20px] h-[20px]" /></span>
                    </div>
                    <div className="flex gap-1">
                        <img src={male} className="w-[30px] h-[30px]" alt='profile' />
                        <DropdownMenu className="text-[#9E9E9E]">
                            <DropdownMenuTrigger className="outline-none cursor-pointer">
                                <ChevronDownIcon className="w-5 h-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {/* Meeting */}
                <div>
                    <h3 className="text-[#8B7EF8] font-medium text-xl mb-5">Schedule Meeting</h3>
                    <div className="flex gap-1 items-center justify-center">
                        <div className="bg-[#8B7EF8] flex gap-1 text-white py-2 px-3 rounded-[8px]">
                            <UserIcon className="w-5 h-5" />
                            <button>One-on-One</button>
                        </div>
                        <span>or</span>
                        <div className="bg-[#8B7EF8] flex gap-1 text-white py-2 px-3 rounded-[8px]">
                            <UserGroupIcon className="w-5 h-5" />
                            <button>Group Meeting</button>
                        </div>
                    </div>
                </div>
                {/*Medical History  */}
                <div>
                    <h3 className="text-[#8B7EF8] font-medium text-xl mb-5">Create Report</h3>
                    <button className="bg-[#8B7EF8] flex gap-1 text-white py-2 px-3 rounded-[8px]"><PlusIcon /><span>Issue Report</span></button>
                </div>
                {/* Image */}
                <div>
                    <img src={counselling} alt='Counselling demo' />
                </div>
                {/* Notifications */}
                <div>
                    <h3 className="text-[#8B7EF8] text-base font-semibold">Latest Notification</h3>
                    <div className="bg-white w-[282px] flex items-center gap-6 py-3 px-4 rounded-[8px]">
                        <div>
                            <h4 className="font-semibold text-sm">Webinar “Self care essentials...</h4>
                            <p className="font-light text-xs text-[#9C9A9A]">ft. Evelyne, Lynette, Jacey</p>
                        </div>
                        <ArrowLongRightIcon className="w-5 h-5 text-[#9C9A9A]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TherapistRightBar