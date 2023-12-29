import steps from '../assets/steps.svg'

const HowItWorks = () => {
  return (
    <div className='mx-auto w-[75%] mt-[100px]'>
        <h2 className='text-center font-semibold text-2xl md:text-3xl mb-3'>How it Works</h2>
        <p className='text-center mb-10'>Step-by-step guide on how the platform works</p>
        <div className='flex md:flex-col'>
        <img className='hidden md:block md:rotate-0' src={steps} alt='Step by step bar'/>
        <div className='flex flex-col gap-y-12 gap-x-12 md:gap-y-0 md:flex-row'>
            <div>
            <h4 className='text-[#17A398] text-xl'>Connect</h4>
            <p>Find a mentor in your desired profession</p>
            </div>
            <div>
                <h4 className='text-[#17A398] text-xl'>Book a session</h4>
                <p>Schedule a session with your chosen mentor</p>
            </div>
            <div>
                <h4 className='text-[#17A398] text-xl'>Confirm and join</h4>
                <p>Confirm the session details and join the video call</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HowItWorks