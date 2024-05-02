import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { Link } from "react-router-dom";

function ProjectItem({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="mx-5 py-4 lg:min-w-96">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{project.name}</p>
          <h4 className="font-bold text-large">{project.placeName}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl max-h-60"
            src={project.images[0]}
            width={360}
          />
        </CardBody>
      </Card>
    </Link>
  )
}

export default ProjectItem;