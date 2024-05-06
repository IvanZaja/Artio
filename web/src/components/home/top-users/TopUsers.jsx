import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import * as ArtioApi from '../../../services/api.service';
import UserItem from "./user-item/UserItem";


function TopUsers() {

    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await ArtioApi.getUsers();
                const hosts = response.data.filter(user => user.role === 'host');
                
                setHosts(hosts);
                console.log(hosts)
            } catch (error) {
                console.error(error);
            }
          }
          fetch();
    }, [])

  return (
    <div>
        <div className="mt-36 flex items-center justify-between">
            <h2 className="ml-16 text-5xl font-bold">Top hosts</h2>
            <Button className="mr-16 btn-blue rounded-full" variant="bordered">See more hosts</Button>
        </div>
        <div className="flex mt-8 gap-10 justify-evenly">
            {hosts.map((host) => (
                <div key={host.id}>
                    <UserItem user={ host }/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopUsers