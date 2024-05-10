import { Avatar, Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../services/api.service';
import * as ArtioApi from '../services/api.service';
import AuthContext from '../contexts/auth.context';


function CreateRequest() {
    const { userLoged } = useContext(AuthContext)

    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await ArtioApi.getUsers();
                const companies = response.data.filter(user => user.role === 'company');
                
                setCompanies(companies);
                console.log(companies)
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
              await createRequest(data);
              navigate('/requests')
          } catch(err) {
              console.error(err);
          }
        }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
        <div className="flex flex-col items-center w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="text" label="Title" 
                isClearable isInvalid={errors.title}
                color={errors.title ? "danger" : ""}
                variant={errors.title ? "bordered" : "variant"}
                className='max-w-xs'
                {...register("title", { required: true })} />

            <Textarea
                label="Message"
                placeholder="Explain your project to the company"
                className="max-w-xs"
                {...register("message", { required: true })}
            />

            <Select label="Select a company" className="max-w-xs" {...register("company", { required: true })}>
                {companies.map((company) => (
                    <SelectItem key={company.id} value={company.value} startContent={<Avatar className="w-6 h-6" src={company.avatar} />}>
                        {company.name}
                    </SelectItem>
                ))}
            </Select>

            <Select label="Select a project" className="max-w-xs" {...register("project", { required: true })}>
                {userLoged?.projects?.map((project) => (
                    <SelectItem key={project.id} value={project.value}>
                        {project.name}
                    </SelectItem>
                ))}                    
            </Select>

            <Button color="primary" size='lg' className='max-w-xs w-full' type='submit' variant="shadow">
                Send request
            </Button>  
        </div>
    </form>
  )
}

export default CreateRequest;