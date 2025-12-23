import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const navigate = useNavigate()

    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <div className='sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-100/50 transition-all supports-[backdrop-filter]:bg-white/60'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center h-20'>
                <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
                    <img className='h-10 w-auto' src={assets.logo} alt="Hiristiq Logo" />
                    <span className='font-bold text-xl sm:text-2xl text-gray-800 tracking-tight'>Hiristiq</span>
                </div>
                {
                    user
                        ? <div className='flex items-center gap-4 text-secondary font-medium'>
                            <Link to={'/applications'} className='hover:text-primary transition-colors'>Applied Jobs</Link>
                            <span className='text-gray-300'>|</span>
                            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                        : <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600 hover:text-violet-600 font-medium transition-colors'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='bg-violet-600 text-white px-6 sm:px-9 py-2 rounded-full font-medium hover:bg-violet-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>Login</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Navbar