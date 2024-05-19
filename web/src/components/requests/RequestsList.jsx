import {Avatar, Button, Divider, Image, Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../contexts/auth.context";
import * as ArtioApi from '../../services/api.service';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { updateRequest } from '../../services/api.service';
import CheckmarkCircle02Icon from "../icons/checkmark-circle-02-stroke-rounded";
import CancelCircleIcon from "../icons/cancel-circle-stroke-rounded";

function RequestsList({ status }) {

  const navigate = useNavigate();

    const { userLoged } = useContext(AuthContext)
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
    const [projects, setProjects] = useState([]);
    const [hosts, setHosts] = useState([]);
    const [companies, setCompanies] = useState([])


  useEffect(() => {
    async function fetch() {
      try {
        const { data: projects } = await ArtioApi.getProjects();
        setProjects(projects);

        const response = await ArtioApi.getUsers();
        const hosts = response.data.filter(user => user.role === 'host');
        const companies = response.data.filter(user => user.role === 'company');

        setCompanies(companies)
        setHosts(hosts);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [])

    // HANDLE SUBMIT
    const {
      register,
      handleSubmit,
      setValue,
    } = useForm()

    async function onSubmit({ requestId, status, projectId }) {
      try {
        await updateRequest(requestId, {status})
        if(status === 'Accepted') {
          navigate(`/invest/${projectId}`)
        } else if (status === 'Rejected') {
          window.location.href = window.location.href;
        }
      } catch(error) {
        console.error(error)
      }
    }

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys],
      );

  return (
    <div className="flex gap-2 w-full">
      <ListboxWrapper>
        <Listbox 
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
        {userLoged?.requests?.filter(request => request.status === `${status}`).map((request) => (
            <ListboxItem key={request.id}>{request.title}</ListboxItem>
        ))}

        {userLoged?.companyRequests?.filter(request => request.status === `${status}`).map((request) => (
            <ListboxItem key={request.id}>{request.title}</ListboxItem>
        ))}
        </Listbox>
      </ListboxWrapper>
      <div className="w-full">
        {userLoged?.requests?.filter(request => request.id === `${selectedValue}`).map((request) => (
          <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100" key={request.id}>
              {projects.filter(project => project.id === `${request.project}`).map((project) => (
                <div key={project.id} className="">
                  <div className="mt-3">
                    <div className="mx-5">
                      <p className="text-small ml-3 mb-1 text-[#c8c8c9]">Your message:</p>
                      <div className="border-[#e4e4e7] rounded-xl border-small p-5 shadow-lg">
                        <h4>{request.title}</h4>
                        <p className="mb-5">{request.message}</p>
                      </div>
                    </div>
                    <div className="mx-6 mt-5 flex justify-start items-center">
                      <div>
                        <p>Status: {request.status}</p>
                      </div>
                      {companies?.filter(company => company?.id === `${request?.company}`).map((company) => (
                        <div key={company?.id} className="flex items-center ml-3 gap-3 border-l-1 pl-3">
                          <p>Company:</p>
                          <Avatar src={company?.avatar}/>
                          <p>{company?.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center mb-5 mt-4">
                    <Divider className="mx-5 w-[96%]"/>
                  </div>
                  <div className="flex">
                    <div className="w-[360px] mr-5 h-full">
                      <Image className="h-full mx-5 my-5 object-cover" src={project?.coverImg}/>
                    </div>
                    <div className="mx-5 my-5 w-2/3">
                      <h3>{project.name}</h3>
                      <p>{project.placeName}, {project.country}.</p>
                      <p className="my-4">Project goal: {project.goal} €</p>
                      <Link to={`/projects/${project.id}`}>
                        <Button className="rounded-full bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200">Project details</Button>
                      </Link>
                    </div> 
                  </div>
                </div>
              ))}
          </div>
        ))}
        {userLoged?.companyRequests?.filter(request => request.id === `${selectedValue}`).map((request) => (
          <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100" key={request.id}>
              {projects.filter(project => project.id === `${request.project}`).map((project) => (
                <div key={project.id} className="">
                  <div className="mt-3">
                    <div className="mx-5">
                      <p className="text-small ml-3 mb-1 text-[#c8c8c9]">Owner&apos;s message:</p>
                      <div className="border-[#e4e4e7] rounded-xl border-small p-5 shadow-lg">
                        <h4>{request.title}</h4>
                        <p className="mb-5">{request.message}</p>
                      </div>
                    </div>
                      <div className="mx-6 mt-5 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-fit">
                            <p>Status: {request.status}</p>
                          </div>
                          {hosts?.filter(host => host?.id === `${request?.owner}`).map((owner) => (
                            <div key={owner?.id} className="flex items-center ml-3 gap-3 border-l-1 pl-3">
                              <p>Owner:</p>
                              <Avatar src={owner?.avatar}/>
                              <p>{owner?.name}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 my-3 mx-3">
                            <input {...register("status")} type="hidden" />
                            <input {...register("requestId", { value: request.id })} type="hidden" />
                            <input {...register("projectId", { value: project.id })} type="hidden" />
                            {request.status !== 'Accepted' && (
                              <Button onClick={() => setValue("status", "Accepted")} className="shadow-lg transition ease-in-out hover:scale-105 duration-200 rounded-full" type="submit" name="Accepted" color="success"><CheckmarkCircle02Icon /> Accept</Button>
                            )}
                            {request.status !== 'Rejected' && (
                              <Button onClick={() => setValue("status", "Rejected")} variant="bordered" className="border-small border-stone-400 transition ease-in-out hover:shadow-lg hover:scale-105 hover:bg-[#f31260] duration-200 rounded-full hover:text-white" type="submit" name="Rejected" color="danger"><CancelCircleIcon /> Reject</Button>
                            )}
                          </form>
                        </div>
                      </div>
                  </div>
                  <div className="flex justify-center mb-5 mt-4">
                    <Divider className="mx-5 w-[96%]"/>
                  </div>
                  <div className="flex">
                    <div className="w-[360px] mr-5 h-full">
                      <Image className="h-full mx-5 my-5 object-cover" src={project?.coverImg}/>
                    </div>
                    <div className="mx-5 my-5 w-2/3">
                      <h3>{project.name}</h3>
                      <p>{project.placeName}, {project.country}.</p>
                      <p className="my-4">Project goal: {project.goal} €</p>
                      <Link to={`/projects/${project.id}`}>
                        <Button className="rounded-full bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200">Project details</Button>
                      </Link>
                    </div> 
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RequestsList
