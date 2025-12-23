import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto pt-20 pb-16 relative'>
            {/* Background Decorations */}
             <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 animate-fade-in opacity-70'></div>
            <div className='absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-100/40 to-blue-100/40 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 animate-fade-in opacity-70'></div>

            <div className='text-center max-w-4xl mx-auto px-4 opacity-0 animate-fade-in'>
                <div className='inline-block px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm text-violet-600 font-medium text-sm mb-8 border border-violet-100 shadow-sm hover:shadow-md transition-shadow cursor-default'>
                    Update: New Features Available
                </div>
                <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-8 leading-[1.1] tracking-tight'>
                    Find Your Dream Job <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 pb-2'>Today</span>
                </h1>
                <p className='mb-12 max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed font-light'>
                    Connect with thousands of top-tier employers and discover opportunities that match your potential. Your next big career move starts right here.
                </p>
                
                <div className='flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-soft border border-gray-100 max-w-2xl mx-auto p-2 hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex items-center flex-1 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-gray-100 px-4 py-2'>
                        <img className='h-5 w-5 opacity-60' src={assets.search_icon} alt="" />
                        <input type="text"
                            placeholder='Search for jobs'
                            className='text-sm p-2 rounded outline-none w-full text-indigo-900 placeholder:text-gray-400'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center flex-1 w-full sm:w-auto px-4 py-2'>
                        <img className='h-5 w-5 opacity-60' src={assets.location_icon} alt="" />
                        <input type="text"
                            placeholder='Location'
                            className='text-sm p-2 rounded outline-none w-full text-indigo-900 placeholder:text-gray-400'
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition-all shadow-md w-full sm:w-auto mt-2 sm:mt-0 active:scale-95'>
                        Search
                    </button>
                </div>
            </div>

            <div className='mt-20 px-6 border border-gray-100 shadow-md py-10 rounded-xl bg-white max-w-7xl mx-auto'>
                <p className='text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest'>Trusted by leading companies</p>
                <div className='flex overflow-hidden relative w-full mask-gradient'>
                    <div className='flex gap-16 animate-loop-scroll whitespace-nowrap min-w-full px-8 group'>
                        {/* First set of logos */}
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.microsoft_logo} alt="Microsoft" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.walmart_logo} alt="Walmart" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.meta_logo} alt="Meta" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.accenture_logo} alt="Accenture" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.spotify_logo} alt="Spotify" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.samsung_logo} alt="Samsung" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.amazon_logo} alt="Amazon" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.apple_logo} alt="Apple" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.adobe_logo} alt="Adobe" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.airbnb_logo} alt="Airbnb" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.google_logo} alt="Google" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.netflix_logo} alt="Netflix" />


                        {/* Duplicate set for seamless loop */}
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.microsoft_logo} alt="Microsoft" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.walmart_logo} alt="Walmart" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.meta_logo} alt="Meta" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.accenture_logo} alt="Accenture" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.spotify_logo} alt="Spotify" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.samsung_logo} alt="Samsung" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.amazon_logo} alt="Amazon" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.apple_logo} alt="Apple" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.adobe_logo} alt="Adobe" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.airbnb_logo} alt="Airbnb" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.google_logo} alt="Google" />
                        <img className='h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer' src={assets.netflix_logo} alt="Netflix" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero