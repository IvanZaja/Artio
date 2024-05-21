import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Button, Card, CardBody, Link } from '@nextui-org/react'
import Building03Icon from '../components/icons/building-03-stroke-rounded'
import UserIconRegister from '../components/icons/UserIconRegister'
import { NavLink } from 'react-router-dom'

function RegisterRole() {
  return (
    <div>
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
          <div className='w-full flex justify-center'>
            <Card className='mx-5 w-full lg:mx-0 lg:w-1/3 mt-[200px]'>
                <CardBody>
                    <div className='flex justify-center mt-10 mb-5'>
                        <h2>Who are you?</h2>
                    </div>
                    <div className='w-full lg:flex lg:justify-around'>
                        <NavLink to='/register'>
                            <div className='border-small w-full lg:w-[200px] h-[100px] lg:h-[200px] rounded-xl mb-5 flex lg:flex-col justify-start lg:justify-center items-center gap-5 transition ease-in-out hover:bg-[#81F18E] hover:shadow-lg hover:scale-105 duration-200'>
                                <div className='w-1/3 lg:h-2/3 lg:w-full flex justify-center'>
                                    <UserIconRegister className='lg:mt-9 w-[50%] lg:w-full' />
                                </div>
                                <div className='w-1/3 flex lg:h-1/3'>
                                    <h3 className='hidden lg:flex'>Host</h3>
                                    <h1 className='flex mt-[28%] lg:hidden'>Host</h1>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to='/register-company'>
                            <div className='border-small w-full lg:w-[200px] h-[100px] lg:h-[200px] rounded-xl mb-5 flex lg:flex-col justify-start lg:justify-center items-center gap-5 transition ease-in-out hover:bg-[#81F18E] hover:shadow-lg hover:scale-105 duration-200'>
                                <div className='w-1/3 lg:h-2/3 lg:w-full flex justify-center'>
                                    <Building03Icon className='lg:mt-9 w-[50%] lg:w-full'/>
                                </div>
                                <div className='flex lg:h-1/3'>
                                    <h3 className='hidden lg:flex'>Company</h3>
                                    <h1 className='flex mt-[28%] lg:hidden'>Company</h1>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </CardBody>
            </Card>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export default RegisterRole