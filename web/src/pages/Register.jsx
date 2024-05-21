import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import {Button, Card, CardBody, Divider, Input} from "@nextui-org/react";
import {EyeFilledIcon} from "../components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/icons/EyeSlashFilledIcon";
import { useEffect, useMemo, useState } from 'react';
import DragAndDrop from '../components/dragDrop/DragAndDrop';
import { createUser } from '../services/api.service';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import {useFile} from "../hooks/file.hook"


function Register() {

    const {file} = useFile();

    const navigate = useNavigate();

      useEffect(() => {
        console.log("[PARENT] File has changed");
        console.log(file);
      }, [file]);
// VALIDATIONS
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [value, setValue] = useState("");
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalid = useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

// HANDLE SUBMIT
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: 'all' })

      const onSubmit = async (user) => {
        console.log(user)
        const data = new FormData();
        data.append('name', user.name);
        data.append('email', user.email);
        data.append('password', user.password);
        data.append('avatarImage', file);

        try {
            console.log(data)
            await createUser(data);
            console.log(data)
            navigate('/login')
        } catch(err) {
            console.error(err);
        }
      }

      return (
        <>
            <Parallax className='animation' pages={1} style={{ top: '0', left: '0'}}>
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
                        <Card className='w-full mx-5 lg:mx-0 lg:w-3/5 mt-[150px]'>
                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
                                    <div className="w-full">
                                        <div className='flex flex-col lg:flex-row  w-full mb-3 lg:mb-10'>
                                            <div className='w-full lg:w-1/2 flex flex-col justify-center items-center'>
                                                <h3>Let&apos;s create your user!</h3>
                                                <Input type="text" label="Name" 
                                                    isClearable isInvalid={errors.name}
                                                    color={errors.name ? "danger" : ""}
                                                    variant={errors.name ? "bordered" : "variant"}
                                                    onValueChange={setValue} className='max-w-xs mb-3'
                                                    {...register("name", { required: true })} />
                                                    {errors.name && <span className="text-tiny text-danger">Name is required</span>}    

                                                <Input type="email" label="Email" isInvalid={isInvalid || errors.email}
                                                    isClearable color={isInvalid || errors.email ? "danger" : ""}
                                                    variant={isInvalid || errors.email ? "bordered" : "variant"}
                                                    errorMessage={isInvalid && "Please enter a valid email"}
                                                    onValueChange={setValue} className='max-w-xs mb-3'
                                                    {...register("email", { required: true })} />
                                                    {errors.email && <span className="text-tiny text-danger">Email is required</span>}

                                                <Input
                                                    label="Password"
                                                    endContent={
                                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                        {isVisible ? (
                                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                        ) : (
                                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                        )}
                                                        </button>
                                                    }
                                                    type={isVisible ? "text" : "password"}
                                                    className="max-w-xs mb-3"
                                                    isInvalid={errors.password}
                                                    color={errors.password ? "danger" : ""}
                                                    variant={errors.password ? "bordered" : "variant"}
                                                    {...register("password", { required: true })}
                                                />
                                                {errors.password && <span className="text-tiny text-danger">Password is required</span>}
                                                
                                                <Button size='lg' className='max-w-xs mt-5 w-full rounded-full bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200' type='submit' variant="shadow">
                                                    Register user
                                                </Button> 
                                            </div>
                                            <div className='hidden lg:w-1/2 lg:flex'>
                                                <DragAndDrop onFileChange={handleFileChange}
                                                {...register("avatarImage", { value: file })}
                                                />
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

export default Register;