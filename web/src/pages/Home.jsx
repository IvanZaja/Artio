import { Button, Card, Image } from '@nextui-org/react'
import React from 'react'
import Ranking from '../components/ranking/ranking'
import AnalyticsBtn from '../components/analytics-btn/AnalyticsBtn'

function Home() {
  return (
    <>
      <div className='container mx-auto px-10'>
        <h1 className='text-3xl font-bold mt-5'>
          RESTORE NATURE. <br/>REMOVE CARBON.
        </h1>
        <p className='mt-5 text-lg'>Harnessing satellite data and AI to empower companies to confidently invest in nature.</p>
        <div className='flex gap-3 mt-5 mb-5'>
          <Button size='lg' className='w-full btn-green rounded-full' variant="shadow" color="success">Packages</Button>
          <Button size='lg' className='w-full btn-blue rounded-full' variant="bordered" color="foreign">Our mission</Button>
        </div>
      </div>
      <div className='h-96'>
        <img className='h-full object-cover' src='https://res.cloudinary.com/djfnazn3y/image/upload/v1714316631/Artio/dzrolfujdp820jk8id9u.webp'/>
      </div>
      <div className='flex items-center mt-5'>
        <AnalyticsBtn />
      </div>
      
    </>
  )
}

export default Home