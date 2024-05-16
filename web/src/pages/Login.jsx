import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import {Button, Card, Image, Input} from "@nextui-org/react";
import {EyeFilledIcon} from "../components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/icons/EyeSlashFilledIcon";
import { useContext, useMemo, useState } from 'react';
import AuthContext from '../contexts/auth.context';

function Login() {

    const navigate = useNavigate();
    const { doLogin } = useContext(AuthContext);

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
      } = useForm()

      async function onSubmit(data) {
        try {
            await doLogin(data);
            navigate("/");
        } catch(err) {
            console.error(err);
        }
      }

      return (
        <div className='flex'>
            <div className='w-1/2 h-[86.83vh] flex flex-col justify-center items-center'>
                <div className='w-[600px] flex mx-20 flex-col justify-between'>
                    <form onSubmit={handleSubmit(onSubmit)} className='my-14 mx-14'>
                        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                            <h1 className='text-4xl font-semibold'>Welcome back!</h1>
                            <p className='mb-3'>Let&apos;s restore nature.</p>
                            <Input type="email" label="Email" isInvalid={isInvalid || errors.email}
                                isClearable color={isInvalid || errors.email ? "danger" : ""}
                                variant={isInvalid || errors.email ? "bordered" : "variant"}
                                errorMessage={isInvalid && "Please enter a valid email"}
                                onValueChange={setValue} className='w-full'
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
                                className="w-full"
                                isInvalid={errors.password}
                                color={errors.password ? "danger" : ""}
                                variant={errors.password ? "bordered" : "variant"}
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-tiny text-danger">Password is required</span>}

                            
                            <Button color="primary" size='lg' className='w-full' type='submit' variant="shadow">
                                Login
                            </Button>  
                            <p>Don&apos;t have an account? 
                                <Link to='/register'>
                                    <Button color="primary" variant="light">
                                        Sign up
                                    </Button>  
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-1/2 h-[86.83vh] flex justify-center items-center'>
                <Image isZoomed className='w-[100vh] h-[80vh] object-cover' src='https://res.cloudinary.com/djfnazn3y/image/upload/v1715334779/Artio/projects/Ucayali%20Community%20Rainforests/zjy00iynaz9uj1wxhfae.webp' />
            </div>
        </div>
      )
}

export default Login;