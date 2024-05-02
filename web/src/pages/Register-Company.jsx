import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import {Button, Input} from "@nextui-org/react";
import {EyeFilledIcon} from "../components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/icons/EyeSlashFilledIcon";
import { useMemo, useState } from 'react';
import DragAndDrop from '../components/dragDrop/DragAndDrop';
import { createUSer } from '../services/api.service';

function RegisterCompany() {

    const navigate = useNavigate();

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
            await createUSer(data);
            navigate('/login')
        } catch(err) {
            console.error(err);
        }
      }

      return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
            <div className="flex flex-col items-center w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="text" label="Company name" 
                    isClearable isInvalid={errors.name}
                    color={errors.name ? "danger" : ""}
                    variant={errors.name ? "bordered" : "variant"}
                    onValueChange={setValue} className='max-w-xs'
                    {...register("name", { required: true })} />
                    {errors.name && <span className="text-tiny text-danger">Name is required</span>}    

                <Input type="email" label="Email" isInvalid={isInvalid || errors.email}
                    isClearable color={isInvalid || errors.email ? "danger" : ""}
                    variant={isInvalid || errors.email ? "bordered" : "variant"}
                    errorMessage={isInvalid && "Please enter a valid email"}
                    onValueChange={setValue} className='max-w-xs'
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
                    className="max-w-xs"
                    isInvalid={errors.password}
                    color={errors.password ? "danger" : ""}
                    variant={errors.password ? "bordered" : "variant"}
                    {...register("password", { required: true })}
                />
                {errors.password && <span className="text-tiny text-danger">Password is required</span>}

                <DragAndDrop
                    {...register('avatar')}
                />
                <Button color="primary" size='lg' className='max-w-xs w-full' type='submit' variant="shadow">
                    Register company
                </Button>  
            </div>
        </form>

        <div className='flex flex-row justify-center items-center mt-6 w-full flex-wrap md:flex-nowrap gap-4'>
            <p>Are you a user?</p> 
            
            <Link to='/register'>
                <Button color="primary" variant="light">
                    Register here!
                </Button>  
            </Link>
        </div>
        </>
      )
}

export default RegisterCompany;