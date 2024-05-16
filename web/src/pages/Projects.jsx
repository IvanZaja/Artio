import { Button } from '@nextui-org/react'
import ProjectsList from '../components/projects/projects-list/projects-list'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
//import AutocompleteInput from '../components/google/autocomplete/autocomplete-input';
import Map from '../components/google/map/map';
import { LocationContext } from '../contexts/location.context';

function Projects() {

  const { location } = useContext(LocationContext);

  const [locations, setLocations] = useState([]);

  const DEFAULT_LOCATION = { title: 'SPRINGFIELD', lat: 37.18673478102547, lng: -93.29564093012036 };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    console.log(location)
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [location]);

  const handleUpdateProjects = (projects) => {
    const locations = projects.map(({ name, placeName, location, description, id }) => ({
      title: name,
      description: description,
      placeName: placeName,
      url: `/projects/${id}`,
      lat: location[1],
      lng: location[0]
    }))
    setLocations(locations);
  }

  return (
      <div className='flex relative items-center mt-5' style={{backgroundColor:'#dededea5', backdropFilter: 'blur(30px)'}}>
        <div className=''>
          <ProjectsList lat={1} lng={1} limit={20} page={0} onUpdateProjects={handleUpdateProjects} />
        </div>
        <div className="h-screen w-screen">
          {location ? <Map className='h-full w-full z-0' center={{ lat: parseFloat(location[1]), lng: parseFloat(location[0])}} markers={locations} /> : <Map className='h-full w-full z-0' center={{ lat: parseFloat(DEFAULT_LOCATION.lat), lng: parseFloat(DEFAULT_LOCATION.lng)}} markers={locations} />}
        </div>
      </div>
  )
}

export default Projects