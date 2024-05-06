import { Button } from '@nextui-org/react'
import ProjectsList from '../components/projects/projects-list/projects-list'
import { Link, useSearchParams } from 'react-router-dom'
import { useContext, useState } from 'react';
import AuthContext from '../contexts/auth.context';
import AutocompleteInput from '../components/google/autocomplete/autocomplete-input';
import Map from '../components/google/map/map';

function Projects() {
  const { userLoged } = useContext(AuthContext);

  const [locations, setLocations] = useState([]);

  const [seachParams, setSearchParams] = useSearchParams();
  const lat = seachParams.get('lat');
  const lng = seachParams.get('lng');



  const handlePlaceChange = ({ lat, lng }) => {
    setSearchParams({
      lat,
      lng
    })
  }

  const handleUpdateProjects = (projects) => {
    const locations = projects.map(({ name, location}) => ({
      title: name,
      lat: location[1],
      lng: location[0]
    }))
    setLocations(locations);
    console.log(projects)
  }

  return (
    <div className='flex relative items-center mt-5'>
      <div className='flex flex-col absolute top-6 left-0 z-10'>
        {userLoged && (
          <Link to='/create-project'>
            <Button className='mx-5 fixed bottom-5 right-0 z-20 btn-green rounded-full py-4 lg:min-w-96 lg:static ' size='lg' variant="shadow" color="success">Create a project!</Button>
          </Link>
        )}
        <ProjectsList lat={lat} lng={lng} onUpdateProjects={handleUpdateProjects} />
      </div>
      <div className="h-screen w-screen">
        <Map className='h-full w-screen z-0' center={{lat: parseFloat(lat), lng: parseFloat(lng)}} markers={locations} />
      </div>
    </div>
  )
}

export default Projects