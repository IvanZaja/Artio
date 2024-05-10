import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject } from "../services/api.service";
import { Button, Chip, CircularProgress, Image, Progress } from "@nextui-org/react";
import UserItem from "../components/home/top-users/user-item/UserItem";

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
        <div className="w-full h-screen relative">
          <img src={project.coverImg} className="w-full h-full object-cover absolute top-0 left-0 z-0"/>
          <div className="pt-20 pb-12 pl-[100px] pr-[100px] ">
            <div className="absolute z-1 w-3/5 rounded-3xl" style={{backgroundColor:'#49575199', backdropFilter: 'blur(35px)'}}>
              <div className="mx-12">
                <h1 className="text-6xl font-bold text-white mt-10">{project.placeName}</h1>
                <p className="text-xl font-medium text-white my-10">{project.description}</p>
                <Button className="mb-10 rounded-full" color="success" size="lg" >Invest in this project</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="ml-[100px] mr-[60px] my-20 w-2/5">
            <p>PROJECT IMPACTS</p>
            <h1 className="text-6xl font-bold my-5">Benefits go beyond carbon</h1>
            <p className="text-xl">This project will also support the environment, biodiversity, and local communities, including: </p>
            <ul className="ml-[50px]" style={{listStyleType: 'disc'}}>
              <li className="text-xl my-5">{project.beneficts[0]}</li>
              <li className="text-xl my-5">{project.beneficts[1]}</li>
              <li className="text-xl my-5">{project.beneficts[2]}</li>
            </ul>
          </div>
          <div className="my-32 w-2/4 flex justify-center gap-5">
            <div className="">
              <Image
              className="h-[385px] object-cover rounded-3xl mb-5"
              isZoomed
              width={300}
              alt="NextUI Fruit Image with Zoom"
              src={project.images[0]}
            />
            <Image
              className="h-[285px] object-cover rounded-3xl"
              isZoomed
              width={300}
              alt="NextUI Fruit Image with Zoom"
              src={project.images[1]}
            />
            </div>
            <div className="">
              <Image
              className="h-[285px] object-cover rounded-3xl mb-5"
              isZoomed
              width={300}
              alt="NextUI Fruit Image with Zoom"
              src={project.images[2]}
            />
            <Image
              className="h-[385px] object-cover rounded-3xl"
              isZoomed
              width={300}
              alt="NextUI Fruit Image with Zoom"
              src={project.images[3]}
            />
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-900">
          <div className="flex">
            <div className="w-1/2 my-20 ml-[100px]">
              <p className="text-white text-xl">{project.placeName}, {project.country}</p>
              <h1 className="text-white text-6xl font-bold my-5">Additional details</h1>
              <p className="text-white text-xl font-medium my-5">{project.additionalDetails}</p>
              <Button className="my-10 rounded-full" color="success" size="lg">Invest in this project</Button>
            </div>
            <div className="w-1/2 my-20  flex flex-col items-center">
              <CircularProgress
                classNames={{
                    svg: "w-96 h-96 drop-shadow-x",
                    indicator: "stroke-white",
                    track: "stroke-white/10",
                    value: "text-3xl font-semibold text-white",
                    string: "hola"
                }}
                value={1000000}
                strokeWidth={4}
                maxValue={project.goal}
                formatOptions={{style: 'decimal'}}
                showValueLabel={true}
              />
              <Chip classNames={{base: "border-1 border-white/30", content: "text-white/90 text-xl font-semibold"}} className="py-5 px-5 mt-5" variant="bordered">
                Goal: {project.goal} €
              </Chip>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProjectDetails