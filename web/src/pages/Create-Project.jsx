import { Avatar, Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api.service';
import DragAndDrop from '../components/dragDrop/DragAndDrop';
import * as ArtioApi from '../services/api.service';
import Modal from '../components/modalAsk/modal';
import ModalAsk from '../components/modalAsk/modal';


function CreateProject() {

  const navigate = useNavigate();

  // VALIDATIONS
    const [value, setValue] = useState("");
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalid = useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    const [hosts, setHosts] = useState([]);

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
                    
                <div className='flex gap-3'>
                    <Input type="text" label="Coordinates"
                    isClearable 
                    onValueChange={setValue} className='max-w-xs'
                    {...register("location", { required: true })} />
                   
                    <ModalAsk />
                </div>
                
                <Input type="number" label="Goal"
                    isClearable 
                    onValueChange={setValue} className='max-w-xs'
                    {...register("goal", { required: true })} />

                <Select label="Select your collaborators" selectionMode="multiple" className="max-w-xs" {...register("collaborators", { required: true })}>
                    {hosts.map((host) => (
                        <SelectItem key={host.id} value={host.value} startContent={<Avatar className="w-6 h-6" src={host.avatar} />}>
                            {host.name}
                        </SelectItem>
                    ))}
                </Select>
                

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