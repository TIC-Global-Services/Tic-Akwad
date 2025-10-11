import Clientele from '@/components/About/Clientele'
import Founder from '@/components/About/Founder'
import Process from '@/components/About/Process'
import Container from '@/components/Reusbale/Container'
import React from 'react'
import Collaboration from '@/components/About/Collabration'
import Team from '@/components/About/Team'

const page = () => {
  return (
    <div className='bg-[#F5F5F5]' >
        <Container>
    <Clientele />
          <Team />

        {/* <Founder /> */}
        <Collaboration />
        </Container>
    <div key="process-section">
        <Process />
      </div>

    </div>
  )
}

export default page