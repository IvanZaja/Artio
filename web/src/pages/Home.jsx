import Title from '../components/home/title/title';
import Subtitle from '../components/home/subtitle/subtitle';
import TopProjects from '../components/home/top-projects/top-projects';
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
            <Divider className='w-[300px] lg:w-[1254px]' />
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center text-center w-[1254px]'>
              <h2 className='mt-20 mb-12'>How does it works?</h2>
              <p className='mb-20 mx-6 text-lg lg:mx-0'>It is the world&apos;s first tradable carbon token on a public blockchain. The method for calculating the absorption of tons of CO₂ is completely objective, therefore, each cryptographic asset is officially and internationally backed by forest management. These assets will be available on the digital platform, thus forming a non-speculative carbon credit market, based on Network Consensus and Blockchain technology, and backed by Smart Contract.</p>
            </div>
          </div>
          <div className='flex justify-center'>
            <Divider className='w-[300px] lg:w-[1254px]' />
          </div>
          <TopProjects limit={3} page={0}/>
          <div className='flex justify-center'>
            <Divider className='w-[300px] lg:w-[1254px]' />
          </div>
          <TopCompanies />
            <footer className='bg-white rounded-lg shadow m-4 dark:bg-gray-800 mt-[125px]'>
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                  <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Artio - <a href="https://www.linkedin.com/in/ivan-zaja/" className="hover:underline">Ivan&apos;s project for practice purposes</a>.
                  </span>
                  <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">GitHub</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">LinkedIn</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Contact</a>
                      </li>
                  </ul>
                </div>
            </footer>
        </ParallaxLayer>
      </Parallax>
      
    </>
  )
}

export default Home;