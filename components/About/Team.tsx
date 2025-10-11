import React from 'react'

const content = [
    {name:'Pragya', role:'Founder', desc:"For me, Akwad is more than a company — it's a vision brought to life. We started with a simple goal: to help businesses overcome their toughest challenges with solutions they can trust. Seeing our clients grow, succeed, and lead in their industries is the most rewarding part of this journey.", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/1.png?updatedAt=1760168917264'},
    {name:'Shajid', role:'Founder', desc:"For me, Akwad is more than a company — it's a vision brought to life. We started with a simple goal: to help businesses overcome their toughest challenges with solutions they can trust. Seeing our clients grow, succeed, and lead in their industries is the most rewarding part of this journey.", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/2.png?updatedAt=1760168917535'},
    {name:'Saravanakumari', role:'Founder', desc:"For me, Akwad is more than a company — it's a vision brought to life. We started with a simple goal: to help businesses overcome their toughest challenges with solutions they can trust. Seeing our clients grow, succeed, and lead in their industries is the most rewarding part of this journey.", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/3.png?updatedAt=1760168917527'},
    {name:'Samanvitha', role:'Admin', desc:"For me, Akwad is more than a company — it's a vision brought to life. We started with a simple goal: to help businesses overcome their toughest challenges with solutions they can trust. Seeing our clients grow, succeed, and lead in their industries is the most rewarding part of this journey.", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/4.png?updatedAt=1760168917560'},
    {name:'Gokul', role:'Designer', desc:"For me, Akwad is more than a company — it's a vision brought to life. We started with a simple goal: to help businesses overcome their toughest challenges with solutions they can trust. Seeing our clients grow, succeed, and lead in their industries is the most rewarding part of this journey.", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/5.png?updatedAt=1760168917589'},
    {name:'Bala Ayyappan', role:'Developer', desc:"For me, Akwad is more than a company — it's a vision brought to life. We started with a simple goal: to help businesses overcome their toughest challenges with solutions they can trust. Seeing our clients grow, succeed, and lead in their industries is the most rewarding part of this journey.", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/6.png?updatedAt=1760168917567'},
]

const Team = () => {
  return (
    <div className='flex flex-col w-full pt-30'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter text-start mb-12 text-gray-900'>
        Founders & Vision
      </h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full'>
        {content.map((member, index) => (
          <div key={index} className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div className='w-full  overflow-hidden'>
              <img 
                src={member.img} 
                alt={member.name}
                className='w-full h-[320px] object-cover'
              />
            </div>
            
            <div className='p-6 '>
              <h2 className='text-2xl font-bold text-gray-900 mb-1'>
                {member.name}
              </h2>
              
              <p className='text-sm font-semibold text-black uppercase tracking-wide mb-3'>
                {member.role}
              </p>
              
              <p className='text-gray-600 leading-relaxed text-sm'>
                {member.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team