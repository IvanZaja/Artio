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
          
          const { data: response } = await ArtioApi.getProjects(query)
          const projects = response
          .sort((a, b) => b.amountReceived - a.amountReceived)
          .filter((_,index) => limit ? index < limit : true)

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
    <div className='w-full flex justify-center my-20'>
          <div className=' w-[1254px] '>
            <div className="flex items-center justify-between">
                <h2 className=" font-bold">Our most funded projects</h2>
                <Button className="btn-border">See all projects</Button>
            </div>
            <div className="mt-10 gap-3 flex flex-wrap justify-between">
                {projects.map((project) => (
                  <div key={project.id}>
                      <ProjectItem project={project}/>
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TopProjects