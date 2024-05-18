import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../public/img/Done.json'
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';

function Thanks() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    initialSegment: [1, 130],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        <Lottie options={defaultOptions}
        height={400}
        width={400}
      />

      <h3>Thank you for invest in this project!</h3>
      <p>Now you can download your extract in your profile.</p>
      <Link to='/MyProfile'>
        <Button className='bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200 rounded-full py-4 mt-6'>Go to profile</Button>
      </Link>
      </div>
    </div>
  )
}

export default Thanks