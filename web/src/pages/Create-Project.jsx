import { Avatar, Button, Card, CardBody, Input, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import {Modal, ModalFooter, useDisclosure} from "@nextui-org/react";
import HelpCircleIcon from "../components/icons/help-circle-stroke-rounded";
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api.service';
import DragAndDrop from '../components/dragDrop/DragAndDrop';
import * as ArtioApi from '../services/api.service';
import ModalAsk from '../components/modalAsk/modal';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import DragAndDropCover from '../components/dragDrop/DragAndDropCover';
import DragAndDropMultiple from '../components/dragDrop/DragAndDropMultiple';


function CreateProject() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const navigate = useNavigate();



  // VALIDATIONS
    const [value, setValue] = useState("");
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalid = useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    const [hosts, setHosts] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetch() {
          try {
            const { data: projects } = await ArtioApi.getProjects();
            setProjects(projects);
          } catch (error) {
            console.error(error);
          }
        }
        fetch();
      }, [])


    useEffect(() => {
        async function fetch() {
            try {
                const response = await ArtioApi.getUsers();
                const hosts = response.data.filter(user => user.role === 'host');
                
                setHosts(hosts);
            } catch (error) {
                console.error(error);
            }
          }
          fetch();
    },[])

  // HANDLE SUBMIT
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm()

    async function onSubmit(data) {
        try {
            await createProject(data);
            navigate('/projects')
        } catch(err) {
            console.error(err);
        }
    }

  return (
    <>
        <Parallax className='animation' pages={2} style={{ top: '0', left: '0'}}>
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
                    <div className='w-full flex justify-center'>
                        <Card className='w-full mx-5 lg:mx-0 lg:w-3/5 my-[150px]'>
                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
                                    <div className="w-full">
                                        <div className='flex flex-col w-full mb-3 lg:mb-10 '>
                                            <h3 className='ml-5'>Let&apos;s create your project!</h3>
                                            <div className='flex flex-row w-full'>
                                                <div className='w-full flex justify-center gap-3 mx-5'>
                                                    <div className='w-1/2'>
                                                        <Input type="text" label="Project title" 
                                                            isClearable isInvalid={errors.name}
                                                            color={errors.name ? "danger" : ""}
                                                            variant={errors.name ? "bordered" : "variant"}
                                                            onValueChange={setValue} className='mb-3'
                                                            {...register("name", { required: true })} />

                                                        <Textarea
                                                            label="Project description"
                                                            placeholder="Write something that describes what is your project about..."
                                                            className="mb-3"
                                                            {...register("description", { required: true })}
                                                        />
                                                        <Input type="text" label="Coordinates"
                                                            onValueChange={setValue} className='mb-3'
                                                            {...register("location", { required: true })} 
                                                            endContent={
                                                                <>
                                                                <button className="rounded-full" onClick={onOpen}><HelpCircleIcon/></button>
                                                                <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                                                                    <ModalContent>
                                                                    {(onClose) => (
                                                                        <>
                                                                        <div className="flex">
                                                                        <div className="max-h-96 max-w-64 my-5 ml-5">
                                                                                <img className="h-full w-full rounded-xl shadow-lg" src='https://res.cloudinary.com/djfnazn3y/image/upload/v1715166327/Artio/z4mb1dtrlpsa60rpm07l.gif'/>
                                                                            </div>
                                                                            <div>
                                                                            <ModalHeader className="flex flex-col gap-1">How do I find the latitude and longitude?</ModalHeader>
                                                                                <ModalBody>
                                                                                    <p> 
                                                                                        That is easy! You just have to search for the place on Google Maps, and then right click on the marker.
                                                                                    </p>
                                                                                    <p>
                                                                                        Click on the first option, and you will have the Latitude and Longitude copied.
                                                                                    </p>
                                                                                    <p>
                                                                                        Paste them in the order in which they were given to you and that&apos;s it!
                                                                                    </p>
                                                                                </ModalBody>
                                                                                <ModalFooter>
                                                                                    <Button color="primary" size="lg" className="rounded-full" onPress={onClose}>
                                                                                        Done
                                                                                    </Button>
                                                                                </ModalFooter>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        </>
                                                                    )}
                                                                    </ModalContent>
                                                                </Modal>
                                                                </>
                                                            }
                                                            />
                                                        <Input type="number" label="Project goal in euros"
                                                            isClearable 
                                                            onValueChange={setValue} className='mb-3'
                                                            {...register("goal", { required: true })} />

                                                        <Select label="Select your collaborators" selectionMode="multiple" className="" {...register("collaborators", { required: true })}>
                                                            {hosts.map((host) => (
                                                                <SelectItem key={host.id} value={host.value} startContent={<Avatar className="w-6 h-6" src={host.avatar} />}>
                                                                    {host.name}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>
                                                        
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <div className='w-full flex gap-3 mb-3'>
                                                            <Input type="text" label="Name of the place"
                                                            isClearable 
                                                            onValueChange={setValue} className=''
                                                            {...register("placeName", { required: true })} />
                                                            <Select label="Select the project country" className="" {...register("country")}>
                                                                {projects?.country?.map((country) => (
                                                                    <SelectItem key={country} value={country}>
                                                                        {country}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <Textarea
                                                            label="Project details"
                                                            placeholder="Write some details in deep to understand the project..."
                                                            className=""
                                                            {...register("additionalDetails", { required: true })}
                                                        />
                                                        <div className='mt-3'>
                                                            <Input type="text" label="Benefict 1" 
                                                            isClearable isInvalid={errors.name}
                                                            color={errors.name ? "danger" : ""}
                                                            variant={errors.name ? "bordered" : "variant"}
                                                            onValueChange={setValue} className='mb-3'
                                                            {...register("beneficts", { required: true })} />
                                                            <Input type="text" label="Benefict 2" 
                                                            isClearable isInvalid={errors.name}
                                                            color={errors.name ? "danger" : ""}
                                                            variant={errors.name ? "bordered" : "variant"}
                                                            onValueChange={setValue} className='mb-3'
                                                            {...register("beneficts", { required: true })} />
                                                            <Input type="text" label="Benefict 3" 
                                                            isClearable isInvalid={errors.name}
                                                            color={errors.name ? "danger" : ""}
                                                            variant={errors.name ? "bordered" : "variant"}
                                                            onValueChange={setValue} className='mb-3'
                                                            {...register("beneficts", { required: true })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex mx-5'>
                                                <DragAndDropCover
                                                {...register('coverImg')}
                                                />
                                            </div>
                                            <div className='flex mx-5 gap-5 mt-5'>
                                                <DragAndDropMultiple 
                                                    {...register('images')}
                                                />
                                                <DragAndDropMultiple 
                                                    {...register('images')}
                                                />
                                            </div>
                                            <div className='flex mx-5 gap-5 mt-5'>
                                                <DragAndDropMultiple 
                                                    {...register('images')}
                                                />
                                                <DragAndDropMultiple 
                                                    {...register('images')}
                                                />
                                            </div>
                                            <div className='w-full flex justify-center mt-5'>
                                                <Button size='lg' className='mt-3 w-[70%] rounded-full bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200' type='submit' variant="shadow">
                                                    Create project
                                                </Button> 
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </ParallaxLayer>
            </Parallax>
    </>
  )
}

export default CreateProject;