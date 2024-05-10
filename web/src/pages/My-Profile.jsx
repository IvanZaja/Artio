import { useContext } from "react"
import AuthContext from "../contexts/auth.context"
import { Button, Card, CardBody, CardFooter, Chip, CircularProgress, Divider, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { CheckIcon } from "../components/icons/CheckIcon"

function MyProfile() {
    const { userLoged } = useContext(AuthContext)

  return (
    <div className="flex justify-between mx-10 mt-12">
        <div className="flex gap-16 w-full">
            <div className="flex flex-col">
                <Image src={userLoged?.avatar} className="max-w-80"/>
                {userLoged?.role === 'company' && (
                    <h2 className="text-4xl font-semibold mt-6">Your investments</h2>
                )}
                {userLoged?.role === 'host' && (
                    <h2 className="text-4xl font-semibold mt-6">Your projects</h2>
                )}
                {userLoged?.projects?.map(project => (
                    <div key={project.id} className="my-4">
                        <Link to={`/projects/${project.id}`} className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">{project.name}</h2>
                            <Chip startContent={<CheckIcon size={18} />} variant="faded" color="success">Finished</Chip>
                        </Link>
                        <div>
                            <h2 className="text-xl">{project.placeName}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-6xl font-bold">{userLoged?.name}</h1>
                    <Chip color="success" size="lg" variant="shadow" className="">{userLoged?.role.toUpperCase()}</Chip>
                </div>
                <h2 className="text-xl">{userLoged?.email}</h2>
                <Divider className="my-6" />
                <h2 className="text-3xl">Host level:</h2>
                {userLoged?.role === 'company' && (
                    <div className="mt-6 w-full flex justify-between">
                    <Card className="w-[280px] h-[280px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
                        <CardBody className="justify-center items-center pb-0">
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
                    </Card>
                    <Card className="w-[280px] h-[280px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
                        <CardBody className="justify-center items-center pb-0">
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
                        </CardBody>
                        <CardFooter className="justify-center items-center pt-0">
                            <Chip
                            classNames={{
                                base: "border-1 border-white/30",
                                content: "text-white/90 text-small font-semibold",
                            }}
                            variant="bordered"
                            >
                            Projects finished
                            </Chip>
                        </CardFooter>
                    </Card>
                    <Card className="w-[280px] h-[280px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
                        <CardBody className="justify-center items-center pb-0">
                            <CircularProgress
                            classNames={{
                                svg: "w-36 h-36 drop-shadow-md",
                                indicator: "stroke-white",
                                track: "stroke-white/10",
                                value: "text-3xl font-semibold text-white",
                            }}
                            value={2378}
                            strokeWidth={4}
                            maxValue={2378}
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
                            Total CO² restored
                            </Chip>
                        </CardFooter>
                    </Card>
                </div>
                )}
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