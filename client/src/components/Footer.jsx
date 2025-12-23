import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-slate-900 mt-20'>
        <div className='container px-4 2xl:px-20 mx-auto flex flex-col gap-2 sm:flex-row items-center justify-between py-10'>
            <div className='flex items-center gap-2'>
                <img className='h-8 w-auto' src={assets.logo} alt="Hiristiq Logo" />
                <span className='font-bold text-xl text-white tracking-tight'>Hiristiq</span>
            </div>
            <p className='flex-1 border-l border-gray-700 pl-4 text-sm text-gray-400 max-sm:hidden sm:flex'>Copyright @Jayesh-Muley | All right reserved.</p>
            <div className='flex gap-4'>
                <a href="https://github.com/jayesh3103" target="_blank" rel="noopener noreferrer" className='opacity-70 hover:opacity-100 transition-opacity'>
                    <img width={30} className='invert brightness-0' src={assets.github_icon} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/mr-jayeshmuley/" target="_blank" rel="noopener noreferrer" className='opacity-70 hover:opacity-100 transition-opacity'>
                    <img width={30} className='invert brightness-0' src={assets.linkedin_icon} alt="LinkedIn" />
                </a>
            </div>
        </div>
    </div>
  )
}

export default Footer