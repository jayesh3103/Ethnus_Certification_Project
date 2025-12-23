import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { sendEmail } from "../config/nodemailer.js"

// Get User Data
export const getUserData = async (req, res) => {

    const userId = req.auth.userId

    try {

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}


// Apply For Job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body

    const userId = req.auth.userId

    try {

        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already Applied' })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        // Send Email to Candidate
        const candidateEmailContent = `
            <h2>Application Successful!</h2>
            <p>Dear Candidate,</p>
            <p>Thank you for applying for the position of <strong>${jobData.title}</strong> at <strong>${jobData.companyId.name}</strong>.</p>
            <p>We have received your application and will review it shortly.</p>
            <br>
            <p>Best Regards,</p>
            <p>Hiristiq Team</p>
        `
        
        // We need user email. Let's fetch the user details properly first.
        const user = await User.findById(userId)
        if (user) {
             // Don't await this to keep response fast
             sendEmail({ 
                to: user.email, 
                subject: `Application Received: ${jobData.title}`, 
                html: candidateEmailContent 
            }).catch(err => console.error("Email error:", err))
        }

        // Send Email to Recruiter
        // Assuming companyId has an email field as per schema, let's fetch it if not populated in jobData
        // jobData.companyId is populated? No, it's just an ID in Job model usually unless populated.
        // Let's populate or fetch company details. 
        // Wait, applyForJob just fetched jobData = await Job.findById(jobId). It might not be populated.
        // Let's refetch or assume we need to populate.
        
        // Refetching job with population to get company email
        const detailedJob = await Job.findById(jobId).populate('companyId')
        
        if(detailedJob && detailedJob.companyId && detailedJob.companyId.email) {
             const recruiterEmailContent = `
                <h2>New Job Application</h2>
                <p>Hello,</p>
                <p>A new candidate has applied for the job <strong>${detailedJob.title}</strong>.</p>
                <p><strong>Candidate Details:</strong></p>
                <ul>
                    <li>Name: ${user.firstName} ${user.lastName}</li>
                    <li>Email: ${user.email}</li>
                </ul>
                <p>Please login to your dashboard to view the resume and more details.</p>
                <br>
                <p>Best Regards,</p>
                <p>Hiristiq Team</p>
            `
            sendEmail({
                to: detailedJob.companyId.email,
                subject: `New Applicant for ${detailedJob.title}`,
                html: recruiterEmailContent
            }).catch(err => console.error("Email error:", err))
        }

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {

    try {

        const userId = req.auth.userId

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for this user.' })
        }

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {

        const userId = req.auth.userId

        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({ success: true, message: 'Resume Updated' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}