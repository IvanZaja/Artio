import { useContext, useEffect, useState } from "react";
import * as ArtioApi from '../../../services/api.service';
import ProjectFilterLocation from "../../projectFIlter/project-filter-location";
import { Button, ScrollShadow } from "@nextui-org/react";
//import { useSearchParams } from "react-router-dom";
import AuthContext from '../../../contexts/auth.context';
import { Link } from "react-router-dom";
import ProjectItemList from "../project-item/project-item-list";
import DocumentValidationIcon from "../../icons/document-validation-stroke-rounded";


function ProjectsList({ lat, lng, onUpdateProjects, limit, page }) {
  const [projects, setProjects] = useState([]);
  const { userLoged } = useContext(AuthContext);


  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (lat && lng) {
          query.lat = lat;
          query.lat = lat;
        }
        if (limit) query.limit = limit;

        const { data: projects } = await ArtioApi.getProjects(query);
        setProjects(projects);
        onUpdateProjects(projects);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [lat, lng, limit, page])

  return (
    <div className="flex flex-col justify-center gap-4 backdrop-blur-xl bg-white/30 absolute top-0 left-0 z-10">
      <ScrollShadow className="lg:h-screen">
        {userLoged && (
          <Link to="/create-project">
            <Button
              className="bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200 mx-5 fixed bottom-5 right-0 z-20 rounded-full py-4 lg:min-w-96 lg:static lg:mt-4"
              size="lg"
              variant="shadow"
            >
             <DocumentValidationIcon /> Create a project!
            </Button>
          </Link>
        )}
        <div className="flex flex-col items-center mt-6 w-full">
          {projects.map((project) => (
              <div key={project.id}>
                <ProjectItemList project={project} />
              </div>
            ))}
        </div>
      </ScrollShadow>
    </div>
  );
}

ProjectsList.defaultProps = {
  onUpdateProjects: () => {}
}

export default ProjectsList