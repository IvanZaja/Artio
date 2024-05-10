import {Card, CardHeader, CardBody, Image, CardFooter, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";

function ProjectItem({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card isFooterBlurred className="w-[400px] h-[250px] col-span-12 mb-5 sm:col-span-5">
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={project.coverImg}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div className="w-4/5">
            <h4 className="text-black w-4/5 font-medium text-xl mb-3 truncate text-ellipsis overflow-hidden">{project.placeName}</h4>
            <p className="text-black text-tiny truncate text-ellipsis overflow-hidden">{project.name}</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProjectItem;