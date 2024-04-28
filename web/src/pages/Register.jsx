import { useForm } from 'react-hook-form';
import {Button, Input} from "@nextui-org/react";
import {EyeFilledIcon} from "../components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/icons/EyeSlashFilledIcon";
import { useMemo, useState } from 'react';
import DragDrop from '../components/dragDrop/DragDrop';
import DragAndDrop from '../components/dragDrop/DragAndDrop';

function Register() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [value, setValue] = useState("");


    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => console.log(data)

      return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
            <div className="flex flex-col items-center w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="email" label="Email" isInvalid={isInvalid || errors.emailRequired}
                    isClearable color={isInvalid || errors.emailRequired ? "danger" : ""}
                    variant={isInvalid || errors.emailRequired ? "bordered" : "variant"}
                    errorMessage={isInvalid && "Please enter a valid email"}
                    onValueChange={setValue} className='max-w-xs'
                    {...register("emailRequired", { required: true })} />
                    {errors.emailRequired && <span className="text-tiny text-danger">Email is required</span>}

                <Input type="text" label="Username" 
                    isClearable isInvalid={errors.usernameRequired}
                    color={errors.usernameRequired ? "danger" : ""}
                    variant={errors.usernameRequired ? "bordered" : "variant"}
                    onValueChange={setValue} className='max-w-xs'
                    {...register("usernameRequired", { required: true })} />
                    {errors.usernameRequired && <span className="text-tiny text-danger">Username is required</span>}

                <Input type="text" label="Name" 
                    isClearable isInvalid={errors.nameRequired}
                    color={errors.nameRequired ? "danger" : ""}
                    variant={errors.nameRequired ? "bordered" : "variant"}
                    onValueChange={setValue} className='max-w-xs'
                    {...register("nameRequired", { required: true })} />
                    {errors.nameRequired && <span className="text-tiny text-danger">Name is required</span>}

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
                    isInvalid={errors.passwordRequired}
                    color={errors.passwordRequired ? "danger" : ""}
                    variant={errors.passwordRequired ? "bordered" : "variant"}
                    {...register("passwordRequired", { required: true })}
                />
                {errors.passwordRequired && <span className="text-tiny text-danger">Password is required</span>}

                <DragAndDrop
                    {...register('avatar')}
                />
                <Button color="primary" size='lg' className='max-w-xs w-full' type='submit' variant="shadow">
                    Send
                </Button>  
            </div>
        </form>
      )
}

export default Register