import PublicLayout from '../components/PublicLayout';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <PublicLayout>
      <div className='max-w-7xl mx-auto px-6 py-16 space-y-20'>
        <section className='text-center space-y-6 max-w-3xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-800 leading-tight'>Making a Difference,<br/><span className='text-[#00a8ff]'>One Step at a Time</span></h2>
          <p className='text-gray-600 text-lg'>Join us in our mission to bring hope, support, and resources to communities in need across the globe.</p>
          <div className='flex justify-center gap-4 pt-4'>
            <Link to='/donate' className='px-8 py-3 bg-[#00a8ff] text-white rounded-full font-bold hover:bg-[#0097e6] transition-colors shadow-lg'>Donate Now</Link>
            <Link to='/about' className='px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors'>Learn More</Link>
          </div>
        </section>

        <section>
          <div className='flex justify-between items-end mb-8'>
            <div>
              <h3 className='text-sm font-bold text-[#00a8ff] uppercase tracking-wider mb-2'>Featured Causes</h3>
              <h2 className='text-3xl font-bold text-gray-800'>Help Us Fund These Urgent Projects</h2>
            </div>
            <Link to='/causes' className='hidden md:flex items-center gap-2 text-[#00a8ff] font-semibold hover:underline'>View All <ArrowRight size={16} /></Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[1, 2, 3].map(i => (
              <Link to="/causes" key={i} className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group block'>
                <div className='h-56 bg-gray-200 relative overflow-hidden'>
                  <img src='https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' alt='Cause' />
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 text-red-500'><Heart size={20} /></div>
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-bold text-gray-800 mb-2'>Emergency Medical Relief</h4>
                  <p className='text-gray-600 text-sm mb-6'>Providing urgent medical supplies and care to affected regions.</p>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm font-medium'>
                      <span className='text-[#00a8ff]'>Raised: $45,000</span>
                      <span className='text-gray-500'>Goal: $100,000</span>
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-2'><div className='bg-[#00a8ff] h-2 rounded-full w-[45%]'></div></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
