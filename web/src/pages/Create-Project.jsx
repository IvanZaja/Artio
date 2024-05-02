import { Button, Input, Textarea } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProject, createUSer } from '../services/api.service';
import DragAndDrop from '../components/dragDrop/DragAndDrop';

function CreateProject() {

  const navigate = useNavigate();

  // VALIDATIONS
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
              await createProject(data);
              navigate('/projects')
          } catch(err) {
              console.error(err);
          }
        }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
            <div className="flex flex-col items-center w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="text" label="Name" 
                    isClearable isInvalid={errors.name}
                    color={errors.name ? "danger" : ""}
                    variant={errors.name ? "bordered" : "variant"}
                    onValueChange={setValue} className='max-w-xs'
                    {...register("name", { required: true })} />

                    <Textarea
                      label="Description"
                      placeholder="Enter a description for your project"
                      className="max-w-xs"
                      {...register("description", { required: true })}
                    />

                <Input type="text" label="Place"
                    isClearable 
                    onValueChange={setValue} className='max-w-xs'
                    {...register("placeName", { required: true })} />
                    

                <Input type="number" label="Goal"
                    isClearable 
                    onValueChange={setValue} className='max-w-xs'
                    {...register("goal", { required: true })} />
                

                <DragAndDrop
                    {...register('images')}
                />

                <Button color="primary" size='lg' className='max-w-xs w-full' type='submit' variant="shadow">
                    Create project
                </Button>  
            </div>
        </form>
  )
}

export default CreateProject;