import React from 'react'
import Image from 'next/image'

const content = [
    {name:'Ahmed Saeed', role:'CO-FOUNDER & PARTNER', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/9.png?updatedAt=1760521140348'},

    {name:'Sajid', role:'CO-FOUNDER & PARTNER', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/2.png?updatedAt=1760168917535'},
    {name:'Pragya', role:'CO-FOUNDER & CEO', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/1.png?updatedAt=1760168917264'},

    {name:'Saravanakumari', role:'Manager', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/3.png?updatedAt=1760168917527'},
    {name:'Samanvitha', role:'HEAD OF MARKETING', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/4.png?updatedAt=1760168917560'},
    {name:'Gokul', role:'DIRECTOR OF DESIGN', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/5.png?updatedAt=1760168917589'},
    {name:'Bala Ayyappan', role:'DIRECTOR OF DEVELOPMENT', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/6.png?updatedAt=1760168917567'},
    {name:'ILHAM AHMED HUSSIEN', role:'ACCOUNTS MANAGER', desc:" ", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/7.png?updatedAt=1760521140346'},
    {name:'Siva Sankaran', role:'DEVELOPER', desc:"", img:'https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/8.png?updatedAt=1760521140336'},
  
    

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
              <Image
              width={1000}
              height={1000} 
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