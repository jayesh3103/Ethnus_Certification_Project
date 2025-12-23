import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()

    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    // Function to logout for company
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])

    return (
        <div className='min-h-screen bg-[#f8fafc]'>

            {/* Navbar for Recuriter Panel */}
            <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50'>
                <div className='px-6 flex justify-between items-center h-20'>
                    <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer h-9 w-auto' src={assets.logo} alt="" />
                    {companyData && (
                        <div className='flex items-center gap-4'>
                            <p className='max-sm:hidden font-medium text-gray-600'>Welcome, <span className='text-gray-900 font-semibold'>{companyData.name}</span></p>
                            <div className='relative group'>
                                <img className='w-10 h-10 border border-gray-200 rounded-full object-cover shadow-sm cursor-pointer hover:border-violet-200 transition-colors' src={companyData.image} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 text-left'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-xl border border-gray-100 shadow-xl text-sm min-w-[140px] animate-fade-in'>
                                        <li onClick={logout} className='py-2.5 px-4 cursor-pointer hover:bg-violet-50 hover:text-violet-600 rounded-lg text-gray-600 transition-colors font-medium'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex items-start'>

                {/* Left Sidebar with option to add job, manage jobs, view applications */}
                <div className='inline-block min-h-screen border-r border-gray-100 bg-white/50 backdrop-blur-sm sticky top-20 left-0'>
                    <ul className='flex flex-col items-start pt-8 text-gray-600 font-medium space-y-1'>
                        <NavLink className={({ isActive }) => ` flex items-center p-3.5 sm:px-8 gap-3 w-full hover:bg-gray-50 transition-colors ${isActive && 'bg-violet-50 border-r-[3px] border-violet-500 text-violet-600'}`} to={'/dashboard/add-job'}>
                            <img className={`min-w-5 h-5 transition-opacity ${window.location.pathname.includes('add-job') ? 'opacity-100' : 'opacity-60'}`} src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3.5 sm:px-8 gap-3 w-full hover:bg-gray-50 transition-colors ${isActive && 'bg-violet-50 border-r-[3px] border-violet-500 text-violet-600'}`} to={'/dashboard/manage-jobs'}>
                            <img className={`min-w-5 h-5 transition-opacity ${window.location.pathname.includes('manage-jobs') ? 'opacity-100' : 'opacity-60'}`} src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3.5 sm:px-8 gap-3 w-full hover:bg-gray-50 transition-colors ${isActive && 'bg-violet-50 border-r-[3px] border-violet-500 text-violet-600'}`} to={'/dashboard/view-applications'}>
                            <img className={`min-w-5 h-5 transition-opacity ${window.location.pathname.includes('view-applications') ? 'opacity-100' : 'opacity-60'}`} src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-6 sm:p-10'>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default Dashboard