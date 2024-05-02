import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject } from "../services/api.service";
import { Image } from "@nextui-org/react";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetch() {
          try {
            const { data } = await getProject(id);
            setProject(data);
          } catch (error) {
            if (error.response?.status == 404) {
              navigate('/');
            }
          }
        }
        fetch();
      }, [id])

  return project && (
    <div>
        <h1>{project.name}</h1>
        <Image
            isBlurred
            width={240}
            src={project.images[0]}
            alt="NextUI Album Cover"
            className="m-5"
        />
        <p>{project.description}</p>
    </div>
  )
}

export default ProjectDetails