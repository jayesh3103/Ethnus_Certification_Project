import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

const ApplyJob = () => {

  const { id } = useParams()

  const { getToken } = useAuth()

  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {

    try {

      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const applyHandler = async () => {
    try {

      if (!userData) {
        return toast.error('Login to apply for jobs')
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {

    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)

  }

  useEffect(() => {
    fetchJob()
  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  }, [JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />

      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-4 py-10 md:px-14 md:py-20 mb-6 bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-xl shadow-sm relative overflow-hidden'>
            {/* Background elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-violet-100/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3'></div>
            
            <div className='flex flex-col md:flex-row items-center z-10'>
              <div className='h-24 w-24 bg-white rounded-xl p-4 mr-4 max-md:mb-4 border border-gray-100 shadow-sm flex items-center justify-center'>
                 <img 
                  className='w-full h-full object-contain' 
                  src={JobData.companyId.image} 
                  alt="" 
                  onError={(e) => {e.target.src = assets.company_icon}}
                 />
              </div>
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-bold text-gray-900'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 opacity-70' src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 opacity-70' src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 opacity-70' src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <img className='h-4 opacity-70' src={assets.money_icon} alt="" />
                    CTC: ₹ {(JobData.salary / 100000).toFixed(0)} Lakhs
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center z-10'>
              <button onClick={applyHandler} className='bg-violet-600 p-2.5 px-10 text-white rounded-lg font-medium hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 active:scale-95'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
              <p className='mt-2 text-gray-500 text-xs'>Posted {moment(JobData.date).fromNow()}</p>
            </div>

          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4 text-gray-900'>Job description</h2>
              <div className='rich-text text-gray-600 leading-relaxed' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              <button onClick={applyHandler} className='bg-violet-600 p-2.5 px-10 text-white rounded-lg font-medium mt-10 hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 active:scale-95'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
            </div>
            {/* Right Section More Jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2 className='font-bold text-xl text-gray-900'>More jobs from {JobData.companyId.name}</h2>
              {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .filter(job => {
                  // Set of applied jobIds
                  const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                  // Return true if the user has not already applied for this job
                  return !appliedJobsIds.has(job._id)
                }).slice(0, 4)
                .map((job, index) => <JobCard key={index} job={job} />)}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob