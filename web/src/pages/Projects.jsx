import { Button } from '@nextui-org/react'
import ProjectsList from '../components/projects/projects-list/projects-list'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
//import AutocompleteInput from '../components/google/autocomplete/autocomplete-input';
import Map from '../components/google/map/map';

function Projects() {

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();

  //const [seachParams, setSearchParams] = useSearchParams();
  //const lat = seachParams.get('lat');
  //const lng = seachParams.get('lng');

  const DEFAULT_LOCATION = { title: 'SPRINGFIELD', lat: 37.18673478102547, lng: -93.29564093012036 };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const handleLocation = (position) => {
    setLocation(locations[position])
  }

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
    setLocation(DEFAULT_LOCATION);
  }

  return (
    <div className='flex relative items-center mt-5'>
      <div className=''>
        <ProjectsList lat={1} lng={1} limit={20} page={0} onUpdateProjects={handleUpdateProjects} onHandleLocation={handleLocation} />
      </div>
      <div className="h-screen w-screen">
        {location ? <Map className='h-full w-full z-0' center={{lat: parseFloat(location.lat), lng: parseFloat(location.lng)}} markers={locations} /> : <p className='animate-pulse text-center'>SELECCIONA UN PROYECTO</p>}
      </div>
    </div>
  )
}

export default Projects