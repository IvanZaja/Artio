import {Avatar, Button, Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../contexts/auth.context";
import * as ArtioApi from '../../services/api.service';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateRequest } from '../services/api.service';

function RequestsList({ status }) {

  const navigate = useNavigate();

    const { userLoged } = useContext(AuthContext)
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
    const [projects, setProjects] = useState([]);
    const [hosts, setHosts] = useState([]);


  useEffect(() => {
    async function fetch() {
      try {
        const { data: projects } = await ArtioApi.getProjects();
        setProjects(projects);
        const response = await ArtioApi.getUsers();
        const hosts = response.data.filter(user => user.role === 'host');
        
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
    } = useForm()

    async function onSubmit(data) {
      try {
          await updateRequest(request.id, 'Accepted');
          navigate('/requests')
      } catch(err) {
          console.error(err);
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
        {userLoged?.companyRequests?.filter(request => request.id === `${selectedValue}`).map((request) => (
            <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100" key={request.id}>
              <p>{request.title}</p>
              <p>{request.message}</p>
              <div>
                {projects.filter(project => project.id === `${request.project}`).map((project) => (
                  <div key={project.id}>
                    <p>{project.name}</p>
                    <p>{project.goal} €</p>
                    <div className="mx-3">
                      {hosts.filter(host => host.id === `${project.owner}`).map((owner) => (
                        <div key={owner.id} className="flex gap-3">
                          <Avatar src={owner.avatar}/>
                          <p>{owner.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 my-3 mx-3">
                <Button color="success" onClick={() => {request.status === 'Accepted'}}>Accept</Button>
                <Button color="danger" onClick={() => {request.status === 'Rejected'}} >Reject</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RequestsList
