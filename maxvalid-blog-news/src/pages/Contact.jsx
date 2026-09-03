import PublicLayout from '../components/PublicLayout';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  return (
    <PublicLayout>
      <div className='max-w-6xl mx-auto py-20 px-6'>
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 mb-4'>Contact Us</h2>
          <p className='text-xl text-gray-600'>Have questions? We'd love to hear from you.</p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='bg-white p-10 rounded-3xl shadow-sm border border-gray-100'>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Send us a message</h3>
            <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); toast.success('Message sent successfully!'); e.target.reset(); }}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Your Name</label>
                <input type='text' className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50' placeholder='John Doe' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                <input type='email' className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50' placeholder='john@example.com' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
                <textarea rows='4' className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50' placeholder='How can we help you?' required></textarea>
              </div>
              <button type='submit' className='w-full py-3 bg-[#00a8ff] text-white rounded-xl font-bold shadow-md hover:bg-[#0097e6] transition-colors'>Send Message</button>
            </form>
          </div>
          
          <div className='space-y-8'>
            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 bg-[#00a8ff]/10 text-[#00a8ff] rounded-full flex items-center justify-center shrink-0'><MapPin size={24}/></div>
              <div>
                <h4 className='text-xl font-bold text-gray-800 mb-1'>Our Headquarters</h4>
                <p className='text-gray-600'>123 Charity Lane, Hope City<br/>Dhaka 1212, Bangladesh</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 bg-[#00a8ff]/10 text-[#00a8ff] rounded-full flex items-center justify-center shrink-0'><Mail size={24}/></div>
              <div>
                <h4 className='text-xl font-bold text-gray-800 mb-1'>Email Us</h4>
                <p className='text-gray-600'>support@maxvalid.com<br/>info@maxvalid.com</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 bg-[#00a8ff]/10 text-[#00a8ff] rounded-full flex items-center justify-center shrink-0'><Phone size={24}/></div>
              <div>
                <h4 className='text-xl font-bold text-gray-800 mb-1'>Call Us</h4>
                <p className='text-gray-600'>+880 1234 567890<br/>Mon-Fri, 9am - 5pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
