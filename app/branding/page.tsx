import Hero from '@/components/Branding/Hero'
import Typo from '@/components/Branding/Typo'
import Container from '@/components/Reusbale/Container'

import React from 'react'

const page = () => {
  return (
    <div>
      <Container>
<Hero />
        <Typo />
      </Container>
        
    </div>
  )
}

export default page