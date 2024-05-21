import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../public/img/Done.json'
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

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
    <Parallax className='animation' pages={1} style={{ top: '0', left: '0'}}>
      <ParallaxLayer className='z-10' offset={0} speed={0} factor={3}>
      <div className='animation_layer animationBG top-0 left-0' style={{backgroundColor:'#dededea5', backdropFilter: 'blur(30px)'}}></div>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={1.5}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '50%', marginLeft: '70%', marginTop: '200px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={4.5}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '30%', marginLeft: '-100px', marginTop: '100px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={1.0}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '10%', marginLeft: '100px', marginTop: '900px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={2.5}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '10%', marginLeft: '400px', marginTop: '600px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-20'  offset={0} speed={0.5}>
      <div className='mt-[100px]'>
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
      </div>
      </ParallaxLayer>
  </Parallax>
    
  )
}

export default Thanks