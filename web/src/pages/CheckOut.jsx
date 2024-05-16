import {Button, ButtonGroup, Card, Image, Input, Slider} from "@nextui-org/react";
import * as ArtioApi from '../services/api.service';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Divider} from "@nextui-org/divider";
import { useForm } from "react-hook-form";
import { updateAmountReceived } from '../services/api.service';
import BreadcrumbsPay from "../components/breadcrumbs/breadcrumbs";
import {Accordion, AccordionItem} from "@nextui-org/react";
import DocForm from "../components/docForm/docForm";
import PaymentMethod from "../components/payment/method/PaymentMethod";

function CheckOut() {

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
    setValue,
  } = useForm()

  async function onSubmit({ projectId, amountReceived }) {
    console.log(amountReceived)
    console.log(projectId)
    try {
      await updateAmountReceived(projectId, {amountReceived})
      navigate(`/invest/${projectId}/checkout`)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div>
        <div className='flex justify-center'>
            <div className='flex w-[1280px] justify-evenly'>
                <div className='mt-8 w-[500px] flex flex-col'>
                <BreadcrumbsPay current={'checkout'} project={project}/>
                <Accordion
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
                        <DocForm />
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 1" title="Payment method">
                        <PaymentMethod />
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
                        <Accordion
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
                    <Button color="primary" className="w-full mt-5 rounded-full">Pay it!</Button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default CheckOut