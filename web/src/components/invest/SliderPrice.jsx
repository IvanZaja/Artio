import {Button, Card, Input, Slider} from "@nextui-org/react";
import * as ArtioApi from '../../services/api.service';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Divider} from "@nextui-org/divider";
import { useForm } from "react-hook-form";
import { updateAmountReceived } from '../../services/api.service';



function SliderPrice() {

  const { id } = useParams();
  const [project, setProject] = useState();
  const [tokens, setTokens] = useState(1);
  const navigate = useNavigate();

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
      navigate(`/invest/${projectId}/checkout`, {
        state: {
          tokens
        }
      })
    } catch(error) {
      console.error(error)
    }
  }
  const handleSliderChange = (value) => {
    setTokens(value);
  };

  return (
    <Card className="flex mt-16 w-[450px] items-center">
      <div className="flex flex-col w-80 items-center mx-12">
        <div className="w-full mt-12 mb-6 flex justify-between">
          <p>Price</p>
          <p>50.000 € /Token</p>
        </div>
        <Divider/>
          <div className="w-full my-6 ">
            <div className="flex justify-between">
              <p>Amount</p>
              <p>{project?.goal > project?.amountReceived ? tokens : 0} Tokens</p>
            </div>
            <Slider 
              label=''
              size="sm"
              showTooltip={true}
              minValue={project?.goal > project?.amountReceived ? 1 : 0}
              maxValue={project?.goal > project?.amountReceived ? (project?.goal-project?.amountReceived)/50000 : 0}
              onChange={handleSliderChange}
              className="max-w-md"
            />
          </div>
        <Divider/>
        <div className="w-full my-6 flex justify-between">
          <p>Available stock</p>
          <p>{project?.goal > project?.amountReceived ? (Math.floor((project?.goal-project?.amountReceived)/50000)) : '0'} Tokens</p>
        </div>
        <Divider/>
        <div className="w-full mt-6 mb-1 flex justify-between">
          <p>Transaction fee</p>
          <p>1000 €</p>
        </div>
        <div className="w-full my-1 flex justify-between">
          <p>VAT</p>
          <p>{project?.goal > project?.amountReceived ? ((tokens*50000)*1.21 - (tokens*50000)).toLocaleString('de-DE') : 1.21} €</p>
        </div>
        <div className="w-full mt-1 mb-6 flex justify-between">
          <p>Total</p>
          <p>{project?.goal > project?.amountReceived ? (((tokens*50000)*1.21) + 1000).toLocaleString('de-DE') : 0} €</p>
        </div>
        <Divider/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-3 my-3 mx-3">
          <input {...register("amountReceived")} type="hidden" />
          <input {...register("projectId", { value: id })} className="w-full" type="hidden" />
          <Button color="primary" isDisabled={project?.goal > project?.amountReceived ? false : true} type='submit' name="amountReceived" onClick={() => setValue("amountReceived", project?.goal > project?.amountReceived ? (project.amountReceived + (((tokens*50000)*1.21) + 1000)) : (project?.amountReceived + 0))} className="rounded-full w-full mt-6 mb-12">{project?.goal > project?.amountReceived ? `Buy ${tokens} tokens` : 'No tokens available'}</Button>
        </form>
      </div>
    </Card>
    
  )
}

export default SliderPrice