import PublicLayout from '../components/PublicLayout';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export default function Careers() {
  const jobs = [
    { title: 'Senior Field Coordinator', location: 'Dhaka, Bangladesh', type: 'Full-time' },
    { title: 'Fundraising Manager', location: 'Remote', type: 'Part-time' },
    { title: 'Community Outreach Officer', location: 'Sylhet, Bangladesh', type: 'Contract' }
  ];

  return (
    <PublicLayout>
      <div className='max-w-4xl mx-auto py-20 px-6'>
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 mb-4'>Join Our Team</h2>
          <p className='text-xl text-gray-600'>We are always looking for passionate individuals to help us make a difference.</p>
        </motion.div>
        
        <div className='space-y-6'>
          {jobs.map((job, idx) => (
            <motion.div key={idx} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: idx * 0.1}} className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
              <div>
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>{job.title}</h3>
                <div className='flex items-center gap-4 text-gray-500 text-sm'>
                  <span className='flex items-center gap-1'><MapPin size={16}/> {job.location}</span>
                  <span className='flex items-center gap-1'><Clock size={16}/> {job.type}</span>
                </div>
              </div>
              <button className='px-6 py-2.5 bg-[#00a8ff]/10 text-[#00a8ff] font-bold rounded-full hover:bg-[#00a8ff] hover:text-white transition-colors whitespace-nowrap'>
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
