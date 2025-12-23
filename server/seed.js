import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job.js';
import Company from './models/Company.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const categories = [
    "Programming", "Data Science", "Designing", "Networking", 
    "Management", "Marketing", "Cybersecurity"
];

const locations = [
    "Bangalore", "Washington", "Hyderabad", "Mumbai", 
    "California", "Chennai", "New York"
];

const levels = ["Beginner Level", "Intermediate Level", "Senior Level"];

const jobTitles = {
    "Programming": ["Frontend Developer", "Backend Developer", "Full Stack Engineer", "DevOps Engineer", "Mobile App Developer", "Software Architect", "System Engineer", "Cloud Engineer"],
    "Data Science": ["Data Scientist", "Machine Learning Engineer", "Data Analyst", "AI Researcher", "Big Data Engineer", "Business Intelligence Analyst"],
    "Designing": ["UI/UX Designer", "Product Designer", "Graphic Designer", "Web Designer", "Creative Director", "Art Director"],
    "Networking": ["Network Engineer", "Cloud Architect", "Network Security Specialist", "System Administrator", "Infrastructure Engineer"],
    "Management": ["Product Manager", "Project Manager", "Engineering Manager", "Business Analyst", "Scrum Master", "Operations Manager"],
    "Marketing": ["Digital Marketing Specialist", "Content Strategist", "SEO Specialist", "Social Media Manager", "Growth Hacker", "Marketing Director"],
    "Cybersecurity": ["Cybersecurity Analyst", "Ethical Hacker", "Security Consultant", "Information Security Manager", "Penetration Tester"]
};

// Real-world tech companies
const companiesData = [
    { name: "Google", email: "careers@google.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" },
    { name: "Microsoft", email: "jobs@microsoft.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
    { name: "Amazon", email: "hiring@amazon.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Meta", email: "recruiting@meta.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Netflix", email: "talent@netflix.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
    { name: "Apple", email: "careers@apple.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
    { name: "Adobe", email: "jobs@adobe.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/2560px-Adobe_Corporate_logo.svg.png" },
    { name: "Salesforce", email: "careers@salesforce.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png" },
    { name: "Spotify", email: "join@spotify.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" },
    { name: "Airbnb", email: "careers@airbnb.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" },
    { name: "Uber", email: "jobs@uber.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" },
    { name: "LinkedIn", email: "careers@linkedin.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png" },
    { name: "Twitter", email: "jobs@twitter.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" },
    { name: "Tesla", email: "careers@tesla.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/539px-Tesla_logo.png" },
    { name: "Intel", email: "jobs@intel.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/2560px-Intel_logo_2023.svg.png" },
    { name: "IBM", email: "careers@ibm.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" },
    { name: "Oracle", email: "jobs@oracle.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png" },
    { name: "Cisco", email: "careers@cisco.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png" },
    { name: "Samsung", email: "jobs@samsung.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
    { name: "Hiristiq Partners", email: "recruit@hiristiq.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" } // Adding Hiristiq as a fallback
];

const generateDescription = (title, company) => {
    return `
        <p><strong>${company}</strong> is looking for a talented <strong>${title}</strong> to join our dynamic team. In this role, you will have the opportunity to work on cutting-edge innovative solutions.</p>
        <h2>Key Responsibilities</h2>
        <ul>
            <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
            <li>Write clean, maintainable, and efficient code.</li>
            <li>Participate in code reviews and advocate for best practices.</li>
            <li>Troubleshoot, debug, and upgrade existing systems.</li>
        </ul>
        <h2>Requirements</h2>
        <ul>
            <li>Proven experience in a similar role.</li>
            <li>Strong problem-solving skills and attention to detail.</li>
            <li>Excellent communication and teamwork abilities.</li>
            <li>Passion for technology and continuous learning.</li>
        </ul>
        <p>If you are passionate about technology and want to make an impact, we would love to hear from you!</p>
    `;
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
        console.log("Connected to MongoDB (job-portal)");

        // 1. Clear Data
        await Job.deleteMany({});
        await Company.deleteMany({});
        console.log("Cleared existing data.");

        // 2. Create Companies
        const hashedPassword = await bcrypt.hash('password123', 10);
        const createdCompanies = [];

        for (const companyData of companiesData) {
            const company = await Company.create({
                ...companyData,
                password: hashedPassword
            });
            createdCompanies.push(company);
        }
        console.log(`Created ${createdCompanies.length} companies.`);

        // 3. Generate Jobs
        const jobsToInsert = [];
        const TOTAL_JOBS = 120; // Generating around 120 jobs

        for (let i = 0; i < TOTAL_JOBS; i++) {
            const company = getRandomElement(createdCompanies);
            const category = getRandomElement(categories);
            const title = getRandomElement(jobTitles[category] || jobTitles["Programming"]);
            const location = getRandomElement(locations);
            const level = getRandomElement(levels);
            const salary = getRandomInt(1200000, 5000000);
            
            // Random date within last 30 days
            const date = Date.now() - getRandomInt(0, 30 * 24 * 60 * 60 * 1000);

            jobsToInsert.push({
                title,
                description: generateDescription(title, company.name),
                location,
                category,
                level,
                salary,
                date,
                visible: true,
                companyId: company._id
            });
        }

        await Job.insertMany(jobsToInsert);
        console.log(`Successfully seeded ${jobsToInsert.length} jobs.`);

        mongoose.connection.close();
        console.log("Database connection closed");

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
