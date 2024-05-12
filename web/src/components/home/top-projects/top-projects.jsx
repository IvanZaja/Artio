import { useEffect, useState } from "react";
import * as ArtioApi from '../../../services/api.service';
import ProjectItem from "../../projects/project-item/project-item";
import { Button } from "@nextui-org/react";



function TopProjects({ limit, page }) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
      async function fetch() {
        try {
          const query = {};
          if (limit) query.limit = limit;
          if (page) query.page = page;
          
          const { data: projects } = await ArtioApi.getProjects(query);
          setProjects(projects);
        } catch (error) {
          console.error(error);
        } 
      }
      fetch();
    }, [limit, page]);

  /*useEffect(() => {
    async function fetch() {
      try {
        const response = await ArtioApi.getProjects();
        setProjects(response.data);
        console.log(projects)
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [])*/

  return (
    <div>
        <div className="mt-36 flex items-center justify-between">
            <h2 className="ml-16 text-5xl font-bold">Top projects</h2>
            <Button className="mr-16 btn-blue rounded-full" variant="bordered">See all projects</Button>
        </div>
        <div className="mt-10 gap-3 flex flex-wrap justify-evenly">
            {projects.map((project) => (
              <div key={project.id}>
                  <ProjectItem project={project}/>
              </div>
            ))}
        </div>
    </div>
  )
}

export default TopProjects