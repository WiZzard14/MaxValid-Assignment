import PublicLayout from '../components/PublicLayout';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Causes() {
  const causes = [
    { title: 'Clean Water Initiative', raised: 75, img: 'https://images.unsplash.com/photo-1538300342682-14070a25697c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Education for All', raised: 40, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Disaster Relief Fund', raised: 90, img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Food Distribution', raised: 60, img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Healthcare Support', raised: 25, img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Winter Clothing Drive', raised: 85, img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];
  return (
    <PublicLayout>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Explore Our Causes</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>Your contribution can change lives. Choose a cause that speaks to your heart and help us make a lasting impact.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {causes.map((cause, i) => (
            <div key={i} className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group'>
              <div className='h-48 relative overflow-hidden'>
                <img src={cause.img} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' alt={cause.title} />
              </div>
              <div className='p-6'>
                <h4 className='text-xl font-bold text-gray-800 mb-2'>{cause.title}</h4>
                <p className='text-gray-600 text-sm mb-6'>Join us in making a difference for communities in desperate need of resources.</p>
                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between text-sm font-medium mb-1'>
                      <span className='text-[#00a8ff]'>{cause.raised}% Funded</span>
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-2'><div className='bg-[#00a8ff] h-2 rounded-full' style={{width: cause.raised + '%'}}></div></div>
                  </div>
                  <Link to='/donate' className='w-full py-2.5 border-2 border-[#00a8ff] text-[#00a8ff] rounded-full font-bold hover:bg-[#00a8ff] hover:text-white transition-colors flex items-center justify-center gap-2'>
                    <Heart size={18} /> Donate to this cause
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
