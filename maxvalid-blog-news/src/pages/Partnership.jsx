import PublicLayout from '../components/PublicLayout';
import { Send } from 'lucide-react';

export default function Partnership() {
  return (
    <PublicLayout>
      <div className='max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16'>
        <div className='flex-1 space-y-6'>
          <h3 className='text-[#00a8ff] font-bold uppercase tracking-wider text-sm'>Partner With Us</h3>
          <h2 className='text-4xl font-bold text-gray-800 leading-tight'>Let's Create Meaningful Change Together.</h2>
          <p className='text-gray-600 text-lg leading-relaxed'>Corporate partnerships are vital to our mission. Whether it's through corporate matching, employee volunteering, or sponsoring a specific initiative, we can tailor a partnership that aligns with your company's CSR goals.</p>
          <ul className='space-y-4 pt-4'>
            {['Brand alignment with a trusted global NGO', 'Employee engagement opportunities', 'Measurable CSR impact reporting', 'Tax-deductible corporate contributions'].map((item, i) => (
              <li key={i} className='flex items-center gap-3 text-gray-700 font-medium'>
                <div className='w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[#00a8ff] text-sm'>?</div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
          <h3 className='text-2xl font-bold text-gray-800 mb-6'>Partnership Inquiry</h3>
          <form className='space-y-5' onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent successfully!'); }}>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Company Name</label>
              <input type='text' className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50' required />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Contact Person</label>
                <input type='text' className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                <input type='email' className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50' required />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>How would you like to partner?</label>
              <select className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50'>
                <option>Corporate Sponsorship</option>
                <option>Employee Volunteering</option>
                <option>Donation Matching</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
              <textarea rows={4} className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50'></textarea>
            </div>
            <button type='submit' className='w-full py-3 bg-[#00a8ff] text-white rounded-lg font-bold hover:bg-[#0097e6] transition-colors flex items-center justify-center gap-2'>
              Send Inquiry <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
