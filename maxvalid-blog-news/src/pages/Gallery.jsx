import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1538300342682-14070a25697c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  ];
  return (
    <PublicLayout>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Our Impact in Pictures</h2>
          <p className='text-gray-600'>A visual journey of our recent campaigns and community work.</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {images.map((src, i) => (
            <div key={i} onClick={() => setSelectedImage(src)} className='group relative h-72 rounded-xl overflow-hidden shadow-sm cursor-pointer'>
              <img src={src} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' alt='Gallery Item' />
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <span className='text-white font-bold text-lg tracking-wider'>View Image</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300">&times;</button>
          <img src={selectedImage} alt="Fullscreen" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </PublicLayout>
  );
}
