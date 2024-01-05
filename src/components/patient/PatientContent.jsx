import { Link } from 'react-router-dom';
import hero from '../../assets/patient/hero-img.png';
import femaleProfile from '../../assets/patient/female.svg'
import maleProfile from '../../assets/patient/male.svg'
import call from '../../assets/patient/call.svg'
import video from '../../assets/patient/video.svg'
import { Calendar } from '../ui/calendar';

const PatientContent = () => {
    return (
        <div className="mx-[20px]">
            <h1 className="text-2xl font-bold mt-[49px] mb-3">Welcome <span className="text-[#8B7EF8]">Martin!</span></h1>
            <p className="text-base text-[#808080] mb-[13px]">Search for the best therapists to attend to you! our therapists are qualified  and  certified to give you the best service</p>
            <div>
                <img src={hero} className='max-w-[728px]' alt="Hero image" />
            </div>
            <div className='mt-[38px] flex justify-between'>
                <div className='w-[400px]'>
                    <div className='flex justify-between'>
                        <h2 className='text-[#8B7EF8] text-base font-bold'>Therapists Onboard</h2>
                        <Link className='underline font-semibold'>View all</Link>
                    </div>
                    <hr className='border mt-[28px] border-[#EBEBEB]' />
                    <div>
                        <div className='flex justify-between mt-4'>
                            <div className='flex items-center'>
                                <img src={femaleProfile} className='mr-2' alt='female profile' />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-semibold text-[#8B7EF8]'>Dr. Mary</h4>
                                    <p className='text-xs text-[#808080]'>Psychiatrist</p>
                                </div>
                            </div>
                            <button className='rounded-[8px] text-white py-2 text-sm font-medium px-4 bg-[#8B7EF8]'>Book Now</button>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div className='flex items-center'>
                                <img src={femaleProfile} className='mr-2' alt='female profile' />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-semibold text-[#8B7EF8]'>Dr. Mary</h4>
                                    <p className='text-xs text-[#808080]'>Psychiatrist</p>
                                </div>
                            </div>
                            <button className='rounded-[8px] text-white py-2 text-sm font-medium px-4 bg-[#8B7EF8]'>Book Now</button>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div className='flex items-center'>
                                <img src={maleProfile} className='mr-2' alt='Male profile' />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-semibold text-[#8B7EF8]'>Dr. Kennedy</h4>
                                    <p className='text-xs text-[#808080]'>Psychiatrist</p>
                                </div>
                            </div>
                            <button className='rounded-[8px] text-white py-2 text-sm font-medium px-4 bg-[#8B7EF8]'>Book Now</button>
                        </div>
                    </div>
                                        <hr className='border mt-[28px] border-[#EBEBEB]' />

                </div>
                <div className='bg-[#8B7EF8] rounded-[10px] text-white px-6 py-2 w-[256px]'>
                    <h4 className='text-sm mt-3'>Upcoming Appointment</h4>
                    <div>
                        <div className='flex items-center my-4'>
                            <img src={femaleProfile} className='mr-2' alt='female profile' />
                            <div className='flex flex-col gap-1 text-white'>
                                <h4 className='text-sm font-semibold'>Dr. Mary</h4>
                                <p className='text-xs font-light'>Psychiatrist</p>
                            </div>
                        </div>
                        <h4 className='font-light text-sm'>Agenda</h4>
                        <p className='font-semibold text-[14px]'>Discuss concerns and goals...</p>
                        <div className='flex justify-between my-4'>
                            <div>
                                <h4 className='font-light text-sm'>Next Appointment</h4>
                                <p className='font-semibold text-[14px]'>20 Jan 2024</p>
                            </div>
                            <div>
                                <h4 className='font-light text-sm'>Time</h4>
                                <p className='font-semibold text-[14px]'>15:05 PM</p>
                            </div>
                        </div>
                        <div className='flex justify-between my-4'>
                            <button className='bg-white py-1 px-2 bg-opacity-10 text-white'>Appointment</button>
                            <div className='flex justify-between gap-2'>
                                <button><img src={call} alt='call icon' /></button>
                                <button><img src={video} alt='video icon' /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-[49px]'>
                <div>
                    <h3 className='text-xl font-bold text-[#8B7EF8]'>My schedule</h3>
                    <Calendar />
                </div>
                <div className='w-[412px]'>
                    <h3 className='text-[#8B7EF8] text-xl font-semibold'>Recently Scheduled Appointments</h3>
                    <div className='bg-[#F7F8F9] p-4 flex flex-col gap-[28px]'>
                        <div className='rounded-[8px] bg-[#8B7EF8] p-2 text-white flex gap-2'>
                            <p className='w-8 h-8 rounded-full bg-white flex items-center justify-center'>
                                <span className='text-[#8B7EF8] text-xl font-bold mx-auto'>P</span>
                            </p>
                            <div className='flex flex-col gap-1'>
                            <h4 className='font-semibold text-sm'>Discuss concerns and goals... </h4>
                            <p className='text-xs'>25 Jan | 15:05 PM</p>
                            </div>
                        </div>
                        <div className='rounded-[8px] bg-[#8B7EF8] p-2 text-white flex gap-2'>
                            <p className='w-8 h-8 rounded-full bg-white flex items-center justify-center'>
                                <span className='text-[#8B7EF8] text-xl font-bold mx-auto'>P</span>
                            </p>
                            <div className='flex flex-col gap-1'>
                            <h4 className='font-semibold text-sm'>Discuss concerns and goals... </h4>
                            <p className='text-xs'>25 Jan | 15:05 PM</p>
                            </div>
                        </div>
                        <div className='rounded-[8px] bg-[#8B7EF8] p-2 text-white flex gap-2'>
                            <p className='w-8 h-8 rounded-full bg-white flex items-center justify-center'>
                                <span className='text-[#8B7EF8] text-xl font-bold mx-auto'>P</span>
                            </p>
                            <div className='flex flex-col gap-1'>
                            <h4 className='font-semibold text-sm'>Discuss concerns and goals... </h4>
                            <p className='text-xs'>25 Jan | 15:05 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientContent;