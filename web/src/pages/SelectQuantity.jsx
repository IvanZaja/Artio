import { useEffect, useState } from 'react';
import SliderPrice from '../components/invest/SliderPrice'
import * as ArtioApi from '../services/api.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from '@nextui-org/react';


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
    <div className='flex justify-center'>
        <div className='flex w-[1280px] justify-evenly'>
          <div className='mt-16 w-[500px] flex flex-col justify-between'>
            <p>{project?.placeName}, {project?.country}</p>
            <h1 className='text-3xl font-bold mb-8' style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{project?.name}</h1>
            <Image className='w-full h-[375px] object-cover' src={project?.coverImg}/>
          </div>
          <SliderPrice />
        </div>
    </div>
  )
}

export default SelectQuantity;