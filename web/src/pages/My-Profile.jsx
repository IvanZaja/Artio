import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/auth.context"
import { Button, Card, CardBody, CardFooter, Chip, CircularProgress, Divider, Image, Input } from "@nextui-org/react"
import * as ArtioApi from '../services/api.service';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Settings02Icon from "../components/icons/settings-02-stroke-rounded";
import CheckmarkCircle02Icon from "../components/icons/checkmark-circle-02-stroke-rounded";
import { useForm } from "react-hook-form";
import DocsTable from "../components/docsTable/DocsTable";

function MyProfile() {
    const { userLoged } = useContext(AuthContext)
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetch() {
          try {
            const { data: response } = await ArtioApi.getProjects()
            const filteredProjects = response.filter(project => project.investors.includes(userLoged?.id));
            setProjects(filteredProjects);
          } catch (error) {
            console.error(error);
          } 
        }
        fetch();
      }, [userLoged]);

      const {
        register,
        handleSubmit,
        setValue,
      } = useForm()

      async function onSubmit(data) {
        try {
            await ArtioApi.updateGoal(data.userId, data)
          window.location.href = window.location.href;

        } catch(error) {
            console.error(error)
        }
      }

      const handleChange = (event) => {
        setValue("monthGoal", event.target.value);
      };

return (
    <div className="flex justify-between mx-10 mt-12">
            <div className="flex w-full">
                    <div className="w-2/6">
                            <div className="w-full flex justify-center">
                                    <Image src={userLoged?.avatar} className="w-[350px] h-[350px] rounded-full object-cover"/>
                            </div>
                    </div>
                    <div className="flex flex-col w-4/6">
                            <div className="flex justify-between items-center">
                                    <h1 className="">{userLoged?.name}</h1>
                                    <Chip color="success" size="lg" variant="shadow" className="">{userLoged?.role.toUpperCase()}</Chip>
                            </div>
                            <Divider className="my-6" />
                            <h2 className="mt-10">Profile statistics</h2>
                            <p>This statistics are based on your activity and investments with Artio.</p>
                            {userLoged?.role === 'company' && (
                                    <div className="mt-6 w-full flex justify-between rounded-3xl" style={{backgroundImage: 'url(https://res.cloudinary.com/djfnazn3y/image/upload/v1715334779/Artio/projects/Ucayali%20Community%20Rainforests/zjy00iynaz9uj1wxhfae.webp)', backgroundSize: 'cover'}}>
                                    <Card className="w-full h-[300px] flex flex-row border-none" style={{backgroundColor:'#4957512b', backdropFilter: 'blur(35px)'}}>
                                            <div className="w-1/3">
                                                    <CardBody className="mt-8 mb-3 justify-center items-center pb-0">
                                                            <CircularProgress
                                                            classNames={{
                                                                    svg: "w-36 h-36 drop-shadow-md",
                                                                    indicator: "stroke-white",
                                                                    track: "stroke-white/10",
                                                                    value: "text-3xl font-semibold text-white",
                                                            }}
                                                            value={projects?.length}
                                                            strokeWidth={4}
                                                            maxValue={projects?.length}
                                                            formatOptions={{style: 'decimal'}}
                                                            showValueLabel={true}
                                                            />
                                                    </CardBody>
                                                    <CardFooter className="justify-center items-center pt-0">
                                                            <Chip
                                                            classNames={{
                                                                    base: "border-1 border-white/30",
                                                                    content: "text-white/90 text-small font-semibold",
                                                            }}
                                                            variant="bordered"
                                                            >
                                                            Projects invested
                                                            </Chip>
                                                    </CardFooter>
                                            </div>
                                            <div className="w-1/3 mb-6">
                                                    <CardBody className="mt-8 mb-3 justify-center items-center pb-0">
                                                            <CircularProgress
                                                            classNames={{
                                                                    svg: "w-36 h-36 drop-shadow-md",
                                                                    indicator: "stroke-white",
                                                                    track: "stroke-white/10",
                                                                    value: "text-3xl font-semibold text-white",
                                                            }}
                                                            value={userLoged?.tokens}
                                                            strokeWidth={4}
                                                            maxValue={userLoged?.monthGoal}
                                                            formatOptions={{style: 'decimal'}}
                                                            showValueLabel={true}
                                                            />
                                                    </CardBody>
                                                    <CardFooter className="flex flex-col justify-center gap-3 items-center pt-0">
                                                            <Chip
                                                            classNames={{
                                                                    base: "border-1 border-white/30",
                                                                    content: "text-white/90 text-small font-semibold",
                                                            }}
                                                            variant="bordered"
                                                            >
                                                            Tokens goal this month
                                                            </Chip>
                                                            <Dropdown backdrop="blur">
                                                                    <DropdownTrigger className="">
                                                                            <Button variant="bordered" className="mt-1 rounded-full border-1 border-white/30 text-white/90 text-small font-semibold  transition ease-in-out hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 duration-200" >
                                                                                <Settings02Icon/> Set goal
                                                                            </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu variant="faded" className="flex " aria-label="Static Actions">
                                                                            <DropdownItem key="tokens" isReadOnly>
                                                                                    <Input {...register("monthGoal")} onChange={handleChange} type="number" label='Tokens' /> 
                                                                            </DropdownItem>
                                                                        
                                                                            <DropdownItem  className="text-center border-content4-foreground w-[198.4px] mx-2">
                                                                               <div className="flex gap-2 justify-center items-center"><form onSubmit={handleSubmit(onSubmit)} className=""><input {...register("userId", { value: userLoged?.id} )} className="w-full" type="hidden" /><Button type='submit' onClick={() => setMonthGoal(document.querySelector('input[type="number"]').value)}><CheckmarkCircle02Icon/> Set goal</Button></form></div>
                                                                            </DropdownItem>
                                                                            
                                                                    </DropdownMenu>
                                                            </Dropdown>
                                                    </CardFooter>
                                            </div>
                                            <div className="w-1/3">
                                                    <CardBody className="mt-8 mb-3 justify-center items-center pb-0">
                                                            <CircularProgress
                                                            classNames={{
                                                                    svg: "w-36 h-36 drop-shadow-md",
                                                                    indicator: "stroke-white",
                                                                    track: "stroke-white/10",
                                                                    value: "text-3xl font-semibold text-white",
                                                            }}
                                                            value={userLoged?.tokens*15}
                                                            strokeWidth={4}
                                                            maxValue={userLoged?.monthGoal*15}
                                                            formatOptions={{style: 'decimal'}}
                                                            showValueLabel={true}
                                                            />
                                                    </CardBody>
                                                    <CardFooter className="justify-center items-center pt-0">
                                                            <Chip
                                                            classNames={{
                                                                    base: "border-1 border-white/30",
                                                                    content: "text-white/90 text-small font-semibold",
                                                            }}
                                                            variant="bordered"
                                                            >
                                                            CO² restored this month
                                                            </Chip>
                                                    </CardFooter>
                                            </div>
                                    </Card>
                            </div>
                            )}
                            <DocsTable />

                            {userLoged?.role === 'host' && (
                                    <div className="mt-6 w-full flex justify-between gap-5">
                                    <Card className="flex flex-row w-1/2 h-fit border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
                                            <div className="justify-start items-start my-4 mx-4 w-fit">
                                                    <CircularProgress
                                                    classNames={{
                                                            svg: "w-36 h-36 drop-shadow-md",
                                                            indicator: "stroke-white",
                                                            track: "stroke-white/10",
                                                            value: "text-3xl font-semibold text-white",
                                                    }}
                                                    value={5}
                                                    strokeWidth={4}
                                                    maxValue={5}
                                                    formatOptions={{style: 'decimal'}}
                                                    showValueLabel={true}
                                                    />
                                            </div>
                                            <div className="flex flex-col gap-3 justify-center">
                                                    <Chip
                                                    classNames={{
                                                            base: "border-1 border-white/30",
                                                            content: "text-white/90 text-small font-semibold",
                                                    }}
                                                    variant="bordered"
                                                    >
                                                    Projects created
                                                    </Chip>
                                                    <h1 className="text-white">Total of projects that you have created.</h1>
                                                    <Button variant="bordered" className='rounded-full text-white w-2/3'>See all</Button>
                                            </div>
                                    </Card>
                                    <Card className="flex flex-row w-1/2 h-fit border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
                                            <div className="justify-start items-start my-4 mx-4 w-fit">
                                                    <CircularProgress
                                                    classNames={{
                                                            svg: "w-36 h-36 drop-shadow-md",
                                                            indicator: "stroke-white",
                                                            track: "stroke-white/10",
                                                            value: "text-3xl font-semibold text-white",
                                                    }}
                                                    value={3}
                                                    strokeWidth={4}
                                                    maxValue={5}
                                                    formatOptions={{style: 'decimal'}}
                                                    showValueLabel={true}
                                                    />
                                            </div>
                                            <div className="flex flex-col gap-3 justify-center">
                                                    <Chip
                                                    classNames={{
                                                            base: "border-1 border-white/30",
                                                            content: "text-white/90 text-small font-semibold",
                                                    }}
                                                    variant="bordered"
                                                    >
                                                    Projects finished
                                                    </Chip>
                                                    <h1 className="text-white text-wrap mr-3">Total of projects that you have reached the goal.</h1>
                                            </div>
                                    </Card>
                            </div>
                            )}
                            
                    </div>
            </div>
            
            
    </div>
)
}

export default MyProfile