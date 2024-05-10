import { useContext, useEffect, useState } from "react";
import * as ArtioApi from '../../../services/api.service';
import ProjectItem from "../project-item/project-item";
import ProjectFilterLocation from "../../projectFIlter/project-filter-location";
import { Button, ScrollShadow } from "@nextui-org/react";
//import { useSearchParams } from "react-router-dom";
import AuthContext from '../../../contexts/auth.context';
import { Link } from "react-router-dom";


function ProjectsList({ category, lat, lng, onUpdateProjects, onHandleLocation }) {
  const [projects, setProjects] = useState([]);
  const { userLoged } = useContext(AuthContext);


  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (category) query.category = category;
        if (lat && lng) {
          query.lat = lat;
          query.lat = lat;
        }

        const { data: projects } = await ArtioApi.getProjects();
        setProjects(projects);
        onUpdateProjects(projects);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [lat, lng])

  return (
    
    <div className="flex flex-col gap-4 backdrop-blur-xl bg-white/30 absolute top-0 left-0 z-10">
        
      <ScrollShadow className="lg:h-screen">
      {userLoged && (
          <Link to='/create-project'>
            <Button className='mx-5 fixed bottom-5 right-0 z-20 btn-green rounded-full py-4 lg:min-w-96 lg:static lg:mt-4' size='lg' variant="shadow" color="success">Create a project!</Button>
          </Link>
        )}
      <ProjectFilterLocation location={projects} onHandleLocation={onHandleLocation} />
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectItem project={project}/>
          </div>
        ))}
      </ScrollShadow>
    </div>
    
  )
}

ProjectsList.defaultProps = {
  onUpdateProjects: () => {}
}

export default ProjectsList