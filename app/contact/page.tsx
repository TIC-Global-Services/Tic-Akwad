import Follow from '@/components/Contact/Follow'
import Join from '@/components/Contact/Join'
import Team from '@/components/Contact/Team'
import Touch from '@/components/Contact/Touch'
import Container from '@/components/Reusbale/Container'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#F5F5F5]'>
        <Touch />
<Container>
        <Follow />
        <Team />
        <Join />
    </Container>
    </div>
    
  )
}

export default page