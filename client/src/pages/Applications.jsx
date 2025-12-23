import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {

    try {

      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  return userData ? (
    <>
      <Navbar />
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        
        {/* Resume Section */}
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-10'>
            <div>
                <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                    Your Resume 
                    <span className='px-2 py-0.5 bg-violet-50 text-violet-600 text-xs font-semibold rounded-full border border-violet-100'>Essential</span>
                </h2>
                <p className='text-sm text-gray-500 mt-1'>Manage your resume to apply for jobs faster.</p>
            </div>
            
            <div className='flex items-center gap-3'>
                {
                    isEdit || (userData && userData.resume === "")
                    ? <>
                        <label className='flex items-center cursor-pointer group' htmlFor="resumeUpload">
                            <div className='bg-violet-50 text-violet-600 px-5 py-2.5 rounded-lg font-medium group-hover:bg-violet-100 transition-colors flex items-center gap-2'>
                                <img className='w-4 h-4 opacity-70' src={assets.profile_upload_icon} alt="" />
                                {resume ? resume.name : "Select Resume"}
                            </div>
                            <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                        </label>
                        <button onClick={updateResume} className='bg-violet-600 text-white px-5 py-2.5 rounded-lg hover:bg-violet-700 transition-all shadow-md active:scale-95 font-medium'>Save Resume</button>
                    </>
                    : <div className='flex items-center gap-3'>
                        <a target='_blank' href={userData.resume} className='flex items-center gap-2 bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all font-medium'>
                            View Resume
                        </a>
                        <button onClick={() => setIsEdit(true)} className='text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-lg px-5 py-2.5 transition-all font-medium'>
                            Edit
                        </button>
                    </div>
                }
            </div>
        </div>

        {/* Applications Table */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='p-6 border-b border-gray-100'>
                <h2 className='text-xl font-bold text-gray-800'>Jobs Applied</h2>
                <p className='text-sm text-gray-500 mt-1'>Review the status of your submitted applications</p>
            </div>
            
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white'>
                    <thead className='bg-gray-50/50'>
                        <tr>
                            <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Company</th>
                            <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Job Title</th>
                            <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden'>Location</th>
                            <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-sm:hidden'>Date</th>
                            <th className='py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {userApplications.map((job, index) => true ? (
                        <tr key={index} className='hover:bg-gray-50/60 transition-colors'>
                            <td className='py-4 px-6 border-b border-gray-50'>
                                <div className='flex items-center gap-3'>
                                    <div className='h-10 w-10 p-1.5 bg-white border border-gray-100 rounded-lg flex items-center justify-center shrink-0'>
                                        <img className='w-full h-full object-contain' src={job.companyId.image} alt="" />
                                    </div>
                                    <span className='font-medium text-gray-800'>{job.companyId.name}</span>
                                </div>
                            </td>
                            <td className='py-4 px-6 border-b border-gray-50 text-gray-700 font-medium'>{job.jobId.title}</td>
                            <td className='py-4 px-6 border-b border-gray-50 text-gray-500 max-sm:hidden'>{job.jobId.location}</td>
                            <td className='py-4 px-6 border-b border-gray-50 text-gray-500 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                            <td className='py-4 px-6 border-b border-gray-50'>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                job.status === 'Accepted' ? 'bg-green-50 text-green-600 border-green-100' 
                                : job.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' 
                                : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                                {job.status}
                            </span>
                            </td>
                        </tr>
                        ) : (null))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default Applications