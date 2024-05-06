import { useEffect, useState } from "react";
import * as ArtioApi from '../../../services/api.service';
import ProjectItem from "../project-item/project-item";
import ProjectFilterLocation from "../../projectFIlter/project-filter-location";
import { ScrollShadow } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

function ProjectsList({ category, lat, lng, onUpdateProjects }) {
  const [projects, setProjects] = useState([]);

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
    <>
    <div className="flex flex-col gap-4">
      <ProjectFilterLocation location={projects} />
      <ScrollShadow className="lg:h-[800px]">
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

ProjectsList.defaultProps = {
  onUpdateProjects: () => {}
}

export default ProjectsList