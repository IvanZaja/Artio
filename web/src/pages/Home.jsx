import Title from '../components/home/title/title';
import Subtitle from '../components/home/subtitle/subtitle';
import TopProjects from '../components/home/top-projects/top-projects';
import TopUsers from '../components/home/top-users/TopUsers';
import TopCompanies from '../components/home/top-companies/TopCompanies';
import { Divider } from '@nextui-org/react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import './Home.css';



function Home() {
  return (
    <>
      <Parallax className='animation' pages={2.5} style={{ top: '0', left: '0'}}>
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
        <ParallaxLayer className='z-0' offset={1} speed={1.5}>
          <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '60%', marginLeft: '-200px', marginTop: '300px' }}/>
        </ParallaxLayer>
        <ParallaxLayer className='z-0' offset={1} speed={2.5}>
          <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '40%', marginLeft: '500px', marginTop: '-1500px' }}/>
        </ParallaxLayer>
        <ParallaxLayer className='z-0' offset={1} speed={2.5}>
          <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '40%', marginLeft: '1100px', marginTop: '1500px' }}/>
        </ParallaxLayer>
        <ParallaxLayer className='z-0' offset={1} speed={3.5}>
          <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '20%', marginLeft: '300px', marginTop: '-1500px' }}/>
        </ParallaxLayer>
        <ParallaxLayer className='z-0' offset={1} speed={1.5}>
          <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '90%', marginLeft: '800px', marginTop: '-500px' }}/>
        </ParallaxLayer>
        <ParallaxLayer className='z-0' offset={1} speed={4.5}>
          <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '10%', marginLeft: '900px', marginTop: '1300px' }}/>
        </ParallaxLayer>
        <ParallaxLayer className='z-20'  offset={0} speed={0.5}>
          <Title />
          <Subtitle />
          <div className='flex justify-center'>
            <Divider className='w-[1254px]' />
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center text-center w-[1254px]'>
              <h2 className='mt-20 mb-12'>How does it works?</h2>
              <p className='mb-20'>It is the world&apos;s first tradable carbon token on a public blockchain. The method for calculating the absorption of tons of CO₂ is completely objective, therefore, each cryptographic asset is officially and internationally backed by forest management. These assets will be available on the digital platform, thus forming a non-speculative carbon credit market, based on Network Consensus and Blockchain technology, and backed by Smart Contract.</p>
            </div>
          </div>
          <div className='flex justify-center'>
            <Divider className='w-[1254px]' />
          </div>
          <TopProjects limit={3} page={0}/>
          <div className='w-full flex justify-center'>
            <div className='flex w-[1254px] justify-between'>
              <div className='w-[607px] flex justify-center rounded-3xl' style={{backgroundImage:'url(https://res.cloudinary.com/djfnazn3y/image/upload/v1715334779/Artio/projects/Ucayali%20Community%20Rainforests/zjy00iynaz9uj1wxhfae.webp)', backgroundSize: 'cover'}}>
                <div className='flex w-full justify-evenly rounded-3xl items-center' style={{backgroundColor:'#4957512b', backdropFilter: 'blur(35px)'}}>
                  <TopUsers limit={6} />
                </div>
              </div>
              <div className='w-[607px] flex justify-center rounded-3xl' style={{backgroundImage:'url(https://res.cloudinary.com/djfnazn3y/image/upload/v1715334779/Artio/projects/Ucayali%20Community%20Rainforests/zjy00iynaz9uj1wxhfae.webp)', backgroundSize: 'cover'}}>
                <div className='flex w-full justify-evenly rounded-3xl items-center' style={{backgroundColor:'#4957512b', backdropFilter: 'blur(35px)'}}>
                  <TopCompanies limit={6} />
                </div>
              </div>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </>
  )
}

export default Home;