import { Avatar, Button, Card, CardBody, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../services/api.service';
import * as ArtioApi from '../services/api.service';
import AuthContext from '../contexts/auth.context';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

 
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
                        <Card className='w-full lg:w-1/3 mt-[150px]'>
                            <CardBody>
                            <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
                            <div className="w-full">
                                <div className='flex flex-col lg:flex-row  w-full mb-3 lg:mb-10'>
                                    <div className='w-full flex flex-col justify-start'>
                                        <h3 className='mx-5'>Let&apos;s create your request!</h3>
                                        <Input type="text" label="Title" 
                                            isClearable isInvalid={errors.title}
                                            color={errors.title ? "danger" : ""}
                                            variant={errors.title ? "bordered" : "variant"}
                                            className='max-w-md mx-5'
                                            {...register("title", { required: true })} />

                                        <Textarea
                                            label="Message"
                                            placeholder="Explain your project to the company"
                                            className="max-w-md mx-5 mt-3"
                                            {...register("message", { required: true })}
                                        />

                                        <Select label="Select a company" className="max-w-md mx-5 mt-3" {...register("company", { required: true })}>
                                            {companies.map((company) => (
                                                <SelectItem key={company.id} value={company.value} startContent={<Avatar className="w-6 h-6" src={company.avatar} />}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select label="Select a project" className="max-w-md mx-5 mt-3" {...register("project", { required: true })}>
                                            {userLoged?.projects?.map((project) => (
                                                <SelectItem key={project.id} value={project.value}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}                    
                                        </Select>

                                        <Button size='lg' className='max-w-md mx-5 mt-5 w-full rounded-full bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200' type='submit' variant="shadow">
                                            Send request
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

export default CreateRequest;