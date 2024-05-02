import { useEffect, useState } from "react";
import * as ArtioApi from '../../../services/api.service';
import ProjectItem from "../project-item/project-item";
import ProjectFilterLocation from "../../projectFIlter/project-filter-location";
import { ScrollShadow } from "@nextui-org/react";

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await ArtioApi.getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [])

  return (
    <>
    <div className="flex flex-col gap-4">
      <ProjectFilterLocation location={projects} />
      <ScrollShadow className="h-[800px]">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectItem project={project}/>
          </div>
        ))}
      </ScrollShadow>
    </div>
    </>
  )
}

export default ProjectsList