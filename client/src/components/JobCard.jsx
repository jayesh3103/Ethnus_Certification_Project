import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const JobCard = ({ job }) => {

  const navigate = useNavigate()

  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-violet-100 transition-all duration-300 hover:-translate-y-1 group'>
      <div className='flex items-center gap-3'>
        <div className='h-12 w-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-2 shrink-0 max-sm:h-10 max-sm:w-10'>
            <img 
              className='w-full h-full object-contain' 
              src={job.companyId.image} 
              alt={job.companyId.name} 
              onError={(e) => {e.target.src = assets.company_icon}}
            />
        </div>
        <div className='flex-1 min-w-0'>
            <h5 className='font-semibold text-gray-800 truncate'>{job.companyId.name}</h5>
        </div>
        <span className='bg-indigo-50 text-indigo-500 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-wide shrink-0'>Featured</span>
      </div>
      <h4 className='font-bold text-xl mt-4 text-gray-900 group-hover:text-violet-600 transition-colors duration-300'>{job.title}</h4>
      <div className='flex items-center gap-2 mt-3 text-xs'>
        <span className='bg-gray-50 text-gray-600 border border-gray-100 px-3 py-1 rounded-full font-medium'>{job.location}</span>
        <span className='bg-gray-50 text-gray-600 border border-gray-100 px-3 py-1 rounded-full font-medium'>{job.level}</span>
      </div>
      <p className='text-gray-500 text-sm mt-4 leading-relaxed' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + "..." }}></p>
      <div className='mt-6 flex gap-3 text-sm'>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-violet-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-violet-700 transition-all flex-1 shadow-lg shadow-violet-100'>Apply now</button>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='text-gray-600 border border-gray-200 rounded-lg px-5 py-2.5 font-medium hover:bg-gray-50 hover:text-gray-900 transition-all'>Details</button>
      </div>
    </div>
  )
}

export default JobCard