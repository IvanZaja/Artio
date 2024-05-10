import { useEffect, useState } from "react"
import * as ArtioApi from '../../../services/api.service';
import { Button } from "@nextui-org/react";
import UserItem from "../top-users/user-item/UserItem";


function TopCompanies() {

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

  return (
    <div>
        <div className="mt-36 flex items-center justify-between">
            <h2 className="ml-16 text-5xl font-bold">Top companies</h2>
            <Button className="mr-16 btn-blue rounded-full" variant="bordered">See more companies</Button>
        </div>
        <div className="flex mt-8 gap-10 justify-evenly">
            {companies.map((company) => (
                <div key={company?.id}>
                    <UserItem user={ company }/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopCompanies