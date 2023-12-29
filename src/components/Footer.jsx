import logo from '../assets/logo-footer.svg'
const Footer = () => {
  return (
    <div className='bg-[#F3F2FE] p-8'>
        <div className="flex flex-col mx-auto w-[75%]">
        <div className="flex flex-col gap-5 justify-between md:flex-row">
            <img className='w-[150px] md:w-[200px]' src={logo} alt='company logo' />
            <div className='flex gap-y-4 flex-col'>
                <h4 className="text-lg md:text-2xl font-semibold">Quick Links</h4>
                <a href='/'>Home</a>
                <a href='/'>About Us</a>
                <a href='/'>How it Works</a>
                <a href='/'>Features</a>
            </div>
            <div className='flex gap-y-4 flex-col'>
                <h4 className="text-lg md:text-2xl font-semibold">Support</h4>
                <p>Help Center</p>
                <p>Privacy Policy</p>
                <p>FAQ</p>
                <p>Terms & Condition</p>
                <p>Community</p>
            </div>
        </div>
        <hr className='border border-white my-4'/>
            <p className="self-start">©2024 Decent connect - All Rights Reserved</p>
            </div>
    </div>
  )
}

export default Footer