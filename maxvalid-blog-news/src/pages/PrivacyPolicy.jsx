import PublicLayout from '../components/PublicLayout';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <PublicLayout>
      <div className='max-w-4xl mx-auto py-20 px-6'>
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
          <h2 className='text-4xl font-bold text-gray-800 mb-8 text-center'>Privacy Policy</h2>
          <div className='bg-white p-10 rounded-3xl shadow-sm border border-gray-100 prose max-w-none text-gray-600'>
            <p className='mb-6'>Last updated: October 2023</p>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>1. Information We Collect</h3>
            <p className='mb-6'>We collect information that you provide directly to us, including when you create an account, make a donation, or communicate with us. This may include your name, email address, payment information, and any other information you choose to provide.</p>
            
            <h3 className='text-xl font-bold text-gray-800 mb-3'>2. How We Use Your Information</h3>
            <p className='mb-6'>We use the information we collect to process donations, send transaction receipts, communicate with you about our causes, and improve our services.</p>
            
            <h3 className='text-xl font-bold text-gray-800 mb-3'>3. Data Security</h3>
            <p className='mb-6'>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the internet can be guaranteed to be 100% secure.</p>
            
            <h3 className='text-xl font-bold text-gray-800 mb-3'>4. Cookies</h3>
            <p className='mb-6'>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information to improve and analyze our Service.</p>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
