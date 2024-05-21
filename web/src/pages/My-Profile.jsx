import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/auth.context"
import { Button, Card, CardBody, CardFooter, Chip, CircularProgress, Divider, Image, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react"
import * as ArtioApi from '../services/api.service';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Settings02Icon from "../components/icons/settings-02-stroke-rounded";
import CheckmarkCircle02Icon from "../components/icons/checkmark-circle-02-stroke-rounded";
import { useForm } from "react-hook-form";
import DocsTable from "../components/docsTable/DocsTable";
import Download01Icon from "../components/icons/download-01-stroke-rounded";
import { EyeFilledIcon } from "../components/icons/EyeFilledIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { Link } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

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

        const [selectedColor, setSelectedColor] = useState("default");


      const handleChange = (event) => {
        setValue("monthGoal", event.target.value);
      };

      const totalAmountReceived = userLoged?.projects.reduce((total, project) => total + project.amountReceived, 0);
      const totalGoal = userLoged?.projects.reduce((total, project) => total + project.goal, 0);


return (
<Parallax className='animation' pages={1.4} style={{ top: '0', left: '0'}}>
      <ParallaxLayer className='z-10' offset={0} speed={0} factor={3}>
      <div className='animation_layer animationBG top-0 left-0' style={{backgroundColor:'#dededea5', backdropFilter: 'blur(30px)'}}></div>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={1.5}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '50%', marginLeft: '70%', marginTop: '200px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={4.5}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '30%', marginLeft: '-100px', marginTop: '100px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={1.0}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '10%', marginLeft: '100px', marginTop: '900px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-0' offset={0} speed={2.5}>
      <img src={('https://res.cloudinary.com/djfnazn3y/image/upload/v1715786492/Artio/jfpfq0zonjqb3gmoazux.png')} style={{ width: '10%', marginLeft: '400px', marginTop: '600px' }}/>
      </ParallaxLayer>
      <ParallaxLayer className='z-20'  offset={0} speed={0.5}>
      <div className='mt-[150px]'>
      <div className="flex justify-between mx-10 mt-12">
            <div className="flex w-full">
                    <div className="w-2/6">
                        <div className="w-full flex justify-center">
                                <Image src={userLoged?.avatar} className="w-[350px] h-[350px] rounded-full object-cover"/>
                        </div>
                        <div className="flex justify-around items-center">
                        <h3 className="mt-6">{userLoged?.name}</h3>
                                <Chip color="success" size="lg" variant="shadow" ><p className="animate-pulse">{userLoged?.role.toUpperCase()}</p></Chip>
                        
                        </div>
                    </div>
                    <div className="flex flex-col w-4/6">
                            <h2 className="">Profile statistics</h2>
                            {userLoged?.role === 'company' && (
                                <div>
                                <p>This statistics are based on your activity and investments with Artio.</p>
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
                                                                                <div className="flex gap-2 justify-center items-center"><form onSubmit={handleSubmit(onSubmit)} className=""><input {...register("userId", { value: userLoged?.id} )} className="w-full" type="hidden" /><Button type='submit' ><CheckmarkCircle02Icon/> Set goal</Button></form></div>
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
                                <h2 className="mt-10">Token receipts</h2>
                                <p>Find all your receipts here and download it for your business needs.</p>

                                <DocsTable />
                                </div>
                            )}

                            

                            {userLoged?.role === 'host' && (
                                <div>
                                        <p>This statistics are based on your activity and projects with Artio.</p>

                                        <div className="mt-6 w-full flex justify-between rounded-3xl" style={{backgroundImage: 'url(https://res.cloudinary.com/djfnazn3y/image/upload/v1715334779/Artio/projects/Ucayali%20Community%20Rainforests/zjy00iynaz9uj1wxhfae.webp)', backgroundSize: 'cover'}}>
                                                <Card className="w-full h-[300px] flex flex-row border-none" style={{backgroundColor:'#4957512b', backdropFilter: 'blur(35px)'}}>
                                                        <div className="w-1/3">
                                                                <CardBody className="mt-4 mb-3 justify-center items-center pb-0">
                                                                        <CircularProgress
                                                                        classNames={{
                                                                                svg: "w-48 h-48 drop-shadow-md",
                                                                                indicator: "stroke-white",
                                                                                track: "stroke-white/10",
                                                                                value: "text-3xl font-semibold text-white",
                                                                        }}
                                                                        value={userLoged?.projects?.length}
                                                                        strokeWidth={4}
                                                                        maxValue={userLoged?.projects?.length}
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
                                                                        Projects created
                                                                        </Chip>
                                                                </CardFooter>
                                                        </div>
                                                        <div className="w-1/3 mb-6">
                                                                <CardBody className="mt-4 mb-3 justify-center items-center pb-0">
                                                                        <CircularProgress
                                                                        classNames={{
                                                                                svg: "w-48 h-48 drop-shadow-md",
                                                                                indicator: "stroke-white",
                                                                                track: "stroke-white/10",
                                                                                value: "text-small font-semibold text-white",
                                                                        }}
                                                                        value={totalAmountReceived}
                                                                        strokeWidth={4}
                                                                        maxValue={totalGoal}
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
                                                                        Amount collected from projects
                                                                        </Chip>
                                                                </CardFooter>
                                                        </div>
                                                        <div className="w-1/3">
                                                                <CardBody className="mt-4 mb-3 justify-center items-center pb-0">
                                                                        <CircularProgress
                                                                        classNames={{
                                                                                svg: "w-48 h-48 drop-shadow-md",
                                                                                indicator: "stroke-white",
                                                                                track: "stroke-white/10",
                                                                                value: "text-small font-semibold text-white",
                                                                        }}
                                                                        value={(totalAmountReceived/50000)*15}
                                                                        strokeWidth={4}
                                                                        maxValue={(totalAmountReceived/50000)*15}
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
                                                                        CO² restored in Tons
                                                                        </Chip>
                                                                </CardFooter>
                                                        </div>
                                                </Card>
                                        </div>
                                        <h2 className="mt-10">Your projects</h2>
                                        <p>Find all your projects here.</p>

                                        <div className='my-5'>
                                                <Table aria-label="Example static collection table" 
                                                color={selectedColor}
                                                selectionMode="single" 
                                                defaultSelectedKeys={[]} >
                                                        <TableHeader>
                                                                <TableColumn>NAME</TableColumn>
                                                        </TableHeader>
                                                        <TableBody emptyContent={"No projects to display."}>
                                                                {userLoged?.projects?.map((project) => {
                                                                        return (
                                                                                <TableRow key={project?.id} className="flex justify-between w-full">
                                                                                        <TableCell className='flex justify-between items-center w-full'>
                                                                                                <Link className="flex justify-between items-center w-full" to={`/projects/${project?.id}`}>
                                                                                                        <User
                                                                                                        avatarProps={{radius: "lg", src: project?.coverImg}}
                                                                                                        description={project?.name}
                                                                                                        name={project?.placeName}
                                                                                                        ></User>
                                                                                                        <div className="w-1/6 flex justify-end">
                                                                                                                <EyeIcon/>
                                                                                                        </div>
                                                                                                </Link>
                                                                                        </TableCell>
                                                                                </TableRow>
                                                                        );
                                                                })}
                                                        </TableBody>
                                                </Table>
                                        </div>
                                </div>
                            )}
                            
                    </div>
            </div>
            
            
    </div>
      </div>
      </ParallaxLayer>
  </Parallax>
    
)
}

export default MyProfile