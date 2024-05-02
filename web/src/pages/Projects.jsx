import { Button } from '@nextui-org/react'
import ProjectsList from '../components/projects/projects-list/projects-list'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../contexts/auth.context';

function Projects() {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex items-center mt-5'>
      <div className='flex flex-col'>
        {user && (
          <Link to='/create-project'>
            <Button className='mx-5 btn-green rounded-full py-4 lg:min-w-96' size='lg' variant="shadow" color="success">Create a project!</Button>
          </Link>
        )}
        
        <ProjectsList />
      </div>
      <div className="w-full">
        AQUI VA EL MAPA
      </div>
    </div>
  )
}

export default Projects