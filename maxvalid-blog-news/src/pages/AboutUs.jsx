import PublicLayout from '../components/PublicLayout';

export default function AboutUs() {
  const team = [
    { name: 'Sarah Jenkins', role: 'Executive Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Michael Chen', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Elena Rodriguez', role: 'Community Outreach', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
  ];
  return (
    <PublicLayout>
      <div className='max-w-7xl mx-auto px-6 py-16 space-y-20'>
        <div className='flex flex-col md:flex-row gap-12 items-center'>
          <div className='flex-1 space-y-6'>
            <h3 className='text-[#00a8ff] font-bold uppercase tracking-wider text-sm'>Who We Are</h3>
            <h2 className='text-4xl font-bold text-gray-800 leading-tight'>Dedicated to creating a world where everyone thrives.</h2>
            <p className='text-gray-600 text-lg leading-relaxed'>Since 2010, MaxValid has been at the forefront of community development and disaster response. We believe that through collective action and unwavering compassion, we can solve some of the world's most pressing challenges.</p>
            <p className='text-gray-600 text-lg leading-relaxed'>Our mission is simple: Empower communities, provide immediate relief in times of crisis, and build sustainable futures for generations to come.</p>
          </div>
          <div className='flex-1'>
            <img src='https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' className='rounded-2xl shadow-xl' alt='Our Impact' />
          </div>
        </div>

        <div>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Meet Our Leadership Team</h2>
            <p className='text-gray-600'>The passionate individuals driving our mission forward.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {team.map((member, i) => (
              <div key={i} className='text-center'>
                <div className='w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 shadow-md'>
                  <img src={member.img} className='w-full h-full object-cover' alt={member.name} />
                </div>
                <h4 className='text-xl font-bold text-gray-800'>{member.name}</h4>
                <p className='text-[#00a8ff] font-medium mt-1'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
