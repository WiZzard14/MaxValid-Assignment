import PublicLayout from '../components/PublicLayout';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <PublicLayout>
      <div className='max-w-4xl mx-auto py-20 px-6'>
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
          <h2 className='text-4xl font-bold text-gray-800 mb-8 text-center'>Terms of Service</h2>
          <div className='bg-white p-10 rounded-3xl shadow-sm border border-gray-100 prose max-w-none text-gray-600'>
            <p className='mb-6'>Last updated: October 2023</p>
            <h3 className='text-xl font-bold text-gray-800 mb-3'>1. Acceptance of Terms</h3>
            <p className='mb-6'>By accessing and using MaxValid's services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h3 className='text-xl font-bold text-gray-800 mb-3'>2. Donations</h3>
            <p className='mb-6'>All donations made through our platform are final and non-refundable. MaxValid ensures that all funds are allocated to the specified causes minus standard transaction fees.</p>
            
            <h3 className='text-xl font-bold text-gray-800 mb-3'>3. User Accounts</h3>
            <p className='mb-6'>To use certain features of the site, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.</p>
            
            <h3 className='text-xl font-bold text-gray-800 mb-3'>4. Intellectual Property</h3>
            <p className='mb-6'>The Service and its original content, features, and functionality are and will remain the exclusive property of MaxValid and its licensors.</p>
            
            <p className='mt-8 text-sm italic'>For full legal details, please contact our legal department.</p>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
