import { Link } from 'react-router-dom';
import femaleProfile from '../../assets/patient/female.svg'
import maleProfile from '../../assets/patient/male.svg'
import call from '../../assets/patient/call.svg'
import video from '../../assets/patient/video.svg'
import { Calendar } from '../ui/calendar';
import patient from '../../assets/therapist/patient.svg'
import report from '../../assets/therapist/report.svg'
import consultation from '../../assets/therapist/consultation.svg'
import repeat from '../../assets/therapist/repeat.svg'


const TherapistContent = () => {
    return (
        <div className="mx-[20px]">
            <h1 className="text-2xl font-bold mt-[49px] text-[#8B7EF8] mb-3">Overview</h1>
            <p className="text-base text-[#808080] mb-[13px]">Today is a great day to serve our patients</p>
            <div className='mt-[38px] flex justify-between gap-20'>
                <div className='w-[350px]'>
                    <div className='flex justify-between'>
                        <h2 className='text-[#8B7EF8] text-base font-bold mb-8'>Upcoming Appointments</h2>
                        <Link className='underline font-semibold text-black'>View all</Link>
                    </div>
                    <div className='flex justify-between text-[#9C9A9A] font-semibold text-sm'>
                        <h3>Name</h3>
                        <h3>Disease</h3>
                        <h3>Date</h3>
                        <h3>Time</h3>
                    </div>
                    <hr className='border mt-[28px] border-[#EBEBEB]' />
                    <div>
                        <div className='flex justify-between mt-4 text-[#9C9A9A] font-normal text-sm'>
                            <div className='flex items-center'>
                                <img src={femaleProfile} className='mr-2' alt='female profile' />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-semibold text-[#8B7EF8]'>Grace</h4>
                                    <p className='text-xs text-[#808080] font-normal'>Teacher</p>
                                </div>
                            </div>
                            <p>Anxiety</p>
                            <p>20-01-24</p>
                            <p>15:05</p>
                        </div>
                        <div className='flex justify-between mt-4 text-[#9C9A9A] font-normal text-sm'>
                            <div className='flex items-center'>
                                <img src={femaleProfile} className='mr-2' alt='female profile' />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-semibold text-[#8B7EF8]'>Mary</h4>
                                    <p className='text-xs text-[#808080] font-normal'>Housewife</p>
                                </div>
                            </div>
                            <p>Depression</p>
                            <p>20-01-24</p>
                            <p>15:05</p>
                        </div>
                        <div className='flex justify-between mt-4 text-[#9C9A9A] font-normal text-sm'>
                            <div className='flex items-center'>
                                <img src={maleProfile} className='mr-2' alt='Male profile' />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-semibold text-[#8B7EF8]'>Kennedy</h4>
                                    <p className='text-xs text-[#808080] font-normal'>Workman</p>
                                </div>
                            </div>
                            <p>Anxiety</p>
                            <p>20-01-24</p>
                            <p>15:05</p>
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
                                <h4 className='text-sm font-semibold'>Grace</h4>
                                <p className='text-xs font-light'>Teacher</p>
                            </div>
                        </div>
                        <h4 className='font-light text-sm'>Disease</h4>
                        <p className='font-semibold text-[14px]'>Anxiety</p>
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
                {/* Metrics */}
                <div className='grid grid-cols-2 gap-5'>
                    <div className='border w-[130px] h-[130px] items-center justify-center flex flex-col gap-6 rounded-[8px] p-2 border-[#EBEBEB]'>
                        <div className='flex gap-1'>
                            <img src={patient} alt='patient'/>
                            <h4 className='text-[#9C9A9A] text-xs font-semibold'>Patient</h4>
                        </div>
                        <div>
                        <p className='text-[#8B7EF8] text-2xl'>112</p>
                        <p className='text-[#9C9A9A] text-xs'>Last 30 days</p>
                        </div>
                    </div>
                    <div className='border w-[130px] h-[130px] flex items-center justify-center flex-col gap-6 rounded-[8px] p-2 border-[#EBEBEB]'>
                        <div className='flex gap-1'>
                            <img src={report} alt='report'/>
                            <h4 className='text-[#9C9A9A] text-xs font-semibold'>Report</h4>
                        </div>
                        <div>
                        <p className='text-[#8B7EF8] text-2xl'>108</p>
                        <p className='text-[#9C9A9A] text-xs'>Last 30 days</p>
                        </div>
                    </div>
                    <div className='border w-[130px] h-[130px] flex flex-col items-center justify-center gap-6 rounded-[8px] py-2 border-[#EBEBEB]'>
                        <div className='flex gap-1'>
                            <img src={consultation} alt='consultation'/>
                            <h4 className='text-[#9C9A9A] text-xs font-semibold'>Consultation</h4>
                        </div>
                        <div>
                        <p className='text-[#8B7EF8] text-2xl'>208</p>
                        <p className='text-[#9C9A9A] text-xs'>Last 30 days</p>
                        </div>
                    </div>
                    <div className='border w-[130px] h-[130px] flex flex-col items-center justify-center gap-6 rounded-[8px] p-2 border-[#EBEBEB]'>
                        <div className='flex gap-1'>
                            <img src={repeat} alt='Repeat'/>
                            <h4 className='text-[#9C9A9A] text-xs font-semibold'>Repeat Client</h4>
                        </div>
                        <div>
                        <p className='text-[#8B7EF8] text-2xl'>102</p>
                        <p className='text-[#9C9A9A] text-xs'>Last 30 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TherapistContent;