import {Button, ButtonGroup, Card, Image, Input, Slider} from "@nextui-org/react";
import * as ArtioApi from '../services/api.service';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {Divider} from "@nextui-org/divider";
import { useForm } from "react-hook-form";
import { updateAmountReceived } from '../services/api.service';
import BreadcrumbsPay from "../components/breadcrumbs/breadcrumbs";
import {Accordion, AccordionItem} from "@nextui-org/react";
import PaymentMethod from "../components/payment/method/PaymentMethod";
import jsPDF from "jspdf";
import AuthContext from "../contexts/auth.context"


function CheckOut() {
    const { userLoged } = useContext(AuthContext)

    const { id } = useParams();
  const [project, setProject] = useState();
  const [tokens, setTokens] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await ArtioApi.getProject(id);
        setProject(data);
      } catch (error) {
        if (error.response?.status == 404) {
          navigate('/');
        }
      }
    }
    fetch();
  }, [id])

  const {
    register,
    handleSubmit,
  } = useForm()

  async function onSubmit(data) {
    try {
        await ArtioApi.invest(data.projectId, data)
    } catch(error) {
        console.error(error)
    }
  }

  const itemClasses = {
    trigger: "px-2 py-0 my-6 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
  };

  return (
    <div>
        <div className='flex justify-center'>
            <div className='flex w-[1280px] justify-evenly'>
                <div className='mt-8 w-[500px] flex flex-col'>
                <BreadcrumbsPay current={'checkout'} project={project}/>
                <Accordion itemClasses={itemClasses}
                motionProps={{
                    variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        height: "auto",
                        transition: {
                        height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            duration: 1,
                        },
                        opacity: {
                            easings: "ease",
                            duration: 1,
                        },
                        },
                    },
                    exit: {
                        y: -10,
                        opacity: 0,
                        height: 0,
                        transition: {
                        height: {
                            easings: "ease",
                            duration: 0.25,
                        },
                        opacity: {
                            easings: "ease",
                            duration: 0.3,
                        },
                        },
                    },
                    },
                }}>
                    <AccordionItem className="mt-4" key="1" aria-label="Accordion 1" title="Certificate">
                    <div>
                        <p className='mb-3'>Data to generate your certificate</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className='flex gap-3 mb-3'>
                                <Input type="text" name="name" label="Name" 
                                    {...register("name", { required: true })}
                                />
                                <Input type="text" name="surname" label="Surname" 
                                    {...register("surname", { required: true })}
                                />
                            </div>
                            <div className='flex gap-3 mb-3'>
                                <Input type="email" name="email" label="Email" 
                                    {...register("email", { required: true })}
                                />
                                <Input type="number" name="phoneNumber" label="Phone number" 
                                    {...register("phoneNumber", { required: true })}
                                />
                            </div>
                            <Input className='mb-3' type="text" name="companyName" label="Company name" 
                                {...register("companyName", { required: true })}
                            />
                            <div className='flex gap-3 mb-3'>
                                <Input type="text" name="nif" label="NIF" 
                                    {...register("nif", { required: true })}
                                />
                                <Input type="text" name="vat" label="VAT" 
                                    {...register("vat", { required: true })}
                                />
                            </div>
                            <Input className='mb-3' name="address" type="text" label="Address" 
                                {...register("address", { required: true })}
                            />
                            <div className='flex gap-3 mb-3'>
                                <Input type="text" name="postalCode" label="Postal code" 
                                    {...register("postalCode", { required: true })}
                                />
                                <Input type="text" name="city" label="City" 
                                    {...register("city", { required: true })}
                                />
                            </div>
                            <Input type="text" name="state" label="State" 
                                {...register("state", { required: true })}
                            />
                            <input {...register("projectId", { value: id })} className="w-full" type="hidden" />
                            <input {...register("tokens", { value: data.tokens })} className="w-full" type="hidden" />
                            <div className="w-full flex justify-center">
                                <Button 
                                    type='submit'
                                    className="bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200 rounded-full py-4 w-2/3 my-6"
                                >
                                Save</Button>
                            </div>
                        </form>
                    </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 1" title="Payment method">
                        <PaymentMethod />
                        <Link to={`/invest/${project?.id}/thanks`} className="w-full flex justify-center">
                            <Button 
                                className="bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200 rounded-full py-4 my-3 w-2/3"
                            >
                            Make the payment</Button>
                        </Link>
                    </AccordionItem>
                </Accordion>
                </div>
                <div>
                    <Card className="flex mt-16 w-[450px] items-center">
                    <div className="flex flex-col w-80 items-center mx-12">
                        <div className="w-full gap-3 mt-12 mb-6 flex">
                            <Image className="w-[100px] h-[75px]" src={project?.coverImg}/>
                            <div className="w-2/3">
                                <p className="font-bold" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{project?.name}</p>
                                <p className="truncate">{project?.placeName}</p>
                            </div>
                        </div>
                        <Accordion itemClasses={itemClasses} 
                            motionProps={{
                                variants: {
                                enter: {
                                    y: 0,
                                    opacity: 1,
                                    height: "auto",
                                    transition: {
                                    height: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        duration: 1,
                                    },
                                    opacity: {
                                        easings: "ease",
                                        duration: 1,
                                    },
                                    },
                                },
                                exit: {
                                    y: -10,
                                    opacity: 0,
                                    height: 0,
                                    transition: {
                                    height: {
                                        easings: "ease",
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        easings: "ease",
                                        duration: 0.3,
                                    },
                                    },
                                },
                                },
                            }}
                            >
                            <AccordionItem  className="mb-3" aria-label="Total" title={`Total ${(((data.tokens*50000)*1.21) + 1000).toLocaleString('de-DE')} €`}>
                                <Divider/>
                                <div className="w-full mt-6 mb-1 flex justify-between">
                                    <p>Price</p>
                                    <p>50.000 € /Token</p>
                                </div>
                                <div className="w-full mt-1 mb-6 ">
                                    <div className="flex justify-between">
                                        <p>Amount</p>
                                        <p>{data.tokens} Tokens</p>
                                    </div>
                                </div>
                                <Divider/>
                                <div className="w-full mt-6 mb-1 flex justify-between">
                                    <p>Transaction fee</p>
                                    <p>1000 €</p>
                                </div>
                                <div className="w-full mt-1 mb-6 flex justify-between">
                                    <p>VAT</p>
                                    <p>{project?.goal > project?.amountReceived ? ((tokens*50000)*1.21 - (tokens*50000)).toLocaleString('de-DE') : 1.21} €</p>
                                </div>
                                <Divider/>
                                <div className="w-full mt-6 mb-7 flex justify-between">
                                    <p className="font-bold">Total</p>
                                    <p className="font-bold">{(((data.tokens*50000)*1.21) + 1000).toLocaleString('de-DE')} €</p>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default CheckOut