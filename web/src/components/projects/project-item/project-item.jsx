import {Card, CardHeader, CardBody, Image, CardFooter, Button, Chip} from "@nextui-org/react";
import { Link } from "react-router-dom";

function ProjectItem({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card isFooterBlurred className="w-[370px] h-[450px] col-span-12 mb-5 sm:col-span-5">
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={project.coverImg}
        />
        <CardFooter className="absolute h-[188px] z-10 bottom-0 flex flex-col items-start" style={{backgroundColor:'#4957512b', backdropFilter: 'blur(35px)'}}>
          <div className="flex gap-3">
            <Chip radius="sm" className="bg-white text-[#0e2517] my-5 mx-5 uppercase font-semibold">{project.country}</Chip>
            <p></p>
          </div>
          <div className="w-4/5">
            <h4 className="text-white w-full mx-5 font-medium text-2xl leading-7 mb-3" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{project.name}</h4>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProjectItem;