import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto my-20'>
            <div className='relative bg-gradient-to-br from-indigo-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-3xl overflow-hidden border border-indigo-100 shadow-soft'>
                <div className='relative z-10'>
                    <h1 className='text-2xl sm:text-4xl font-bold mb-6 max-w-md text-gray-800 leading-tight'>Download Mobile App For Better Experience</h1>
                    <p className='text-gray-500 mb-8 max-w-sm'>Access thousands of jobs on the go. Get real-time notifications and apply with a single tap.</p>
                    <div className='flex gap-4'>
                        <a href="#" className='inline-block transform hover:scale-105 transition-transform'>
                            <img className='h-12' src={assets.play_store} alt="Play Store" />
                        </a>
                        <a href="#" className='inline-block transform hover:scale-105 transition-transform'>
                            <img className='h-12' src={assets.app_store} alt="App Store" />
                        </a>
                    </div>
                </div>
                <img className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden opacity-90' src={assets.app_main_img} alt="App Preview" />
            </div>
        </div>
    )
}

export default AppDownload