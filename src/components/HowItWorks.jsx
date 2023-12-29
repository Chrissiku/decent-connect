import steps from '../assets/steps.svg'

const HowItWorks = () => {
  return (
    <div className='mx-auto w-[75%] mt-[100px]'>
        <h2 className='text-center font-semibold text-3xl mb-3'>How it Works</h2>
        <p className='text-center mb-10'>Step-by-step guide on how the platform works</p>
        <div className='flex md:flex-col'>
        <img className='rotate-90 md:rotate-0 w-1/4 md:w-full' src={steps} alt='Step by step bar'/>
        <div className='flex w-3/4 flex-col gap-x-12 md:flex-row'>
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