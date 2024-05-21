import { useEffect, useState } from 'react';
import SliderPrice from '../components/invest/SliderPrice'
import * as ArtioApi from '../services/api.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import BreadcrumbsPay from '../components/breadcrumbs/breadcrumbs';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function SelectQuantity() {

  const { id } = useParams();
  const [project, setProject] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await ArtioApi.getProject(id);
        setProject(data);
      } catch (error) {
        if (error.response?.status == 404) {
          navigate('/');
        }
      }
    }
    fetch();
  }, [id])

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
        <div className='flex justify-center'>
          <div className='flex w-[1280px] justify-evenly'>
            <div className=' w-[500px] flex flex-col justify-between'>
              <BreadcrumbsPay className="" current={'invest'} project={project}/>
              <p className='mt-8'>{project?.placeName}, {project?.country}</p>
              <h1 className='text-3xl font-bold mb-8' style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{project?.name}</h1>
              <Image className='w-full h-[375px] object-cover' src={project?.coverImg}/>
            </div>
            <SliderPrice />
          </div>
        </div>
      </div>
      </ParallaxLayer>
  </Parallax>
  )
}

export default SelectQuantity;