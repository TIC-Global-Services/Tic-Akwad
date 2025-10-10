import Clientele from '@/components/About/Clientele'
import Founder from '@/components/About/Founder'
import Process from '@/components/About/Process'
import Team from '@/components/About/Team'
import Container from '@/components/Reusbale/Container'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#F5F5F5]' >
        <Container>
  
        <Founder />
        <Team />
        </Container>
    <div key="process-section">
        <Process />
      </div>

    </div>
  )
}

export default page