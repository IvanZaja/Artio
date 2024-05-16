import { useEffect, useState } from "react"
import * as ArtioApi from '../../../services/api.service';
import { Avatar, Button, Card, Chip } from "@nextui-org/react";
import UserItem from "../top-users/user-item/UserItem";


function TopCompanies({ limit }) {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const query = {};

                const { data: response} = await ArtioApi.getUsers(query);
                const companies = response
                    .filter(user => user.role === 'company')
                    .sort((a, b) => b.tokens - a.tokens)
                    .filter((_,index) => limit ? index < limit : true)
                    
                setCompanies(companies);
                console.log(companies)
            } catch (error) {
                console.error(error);
            }
          }
          fetch();
    }, [limit])

  return (
    <div className="w-4/5">
        <div className="mt-12 flex items-center justify-between">
            <h2 className="ml-10 text-white font-bold">Top contributors</h2>
        </div>
         <div className="mt-6 mb-12 flex flex-col gap-3 items-center justify-center">
            <Card variant="shadow" classNames={{
                base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-[#FFD700]/50 shadow-[#e3e3e3]/30",
                content: "drop-shadow shadow-black text-[#696969]",
            }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>1</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={companies[0]?.avatar } />
                    <p>{companies[0]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{companies[0]?.tokens} Tokens</p>
                </div>
            </Card> 
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-[#C0C0C0]/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>2</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={companies[1]?.avatar } />
                    <p>{companies[1]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{companies[1]?.tokens} Tokens</p>
                </div>
            </Card> 
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-[#CD7F32]/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>3</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={companies[2]?.avatar } />
                    <p>{companies[2]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{companies[2]?.tokens} Tokens</p>
                </div>
            </Card>
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-white/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>4</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={companies[3]?.avatar } />
                    <p>{companies[3]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{companies[3]?.tokens} Tokens</p>
                </div>
            </Card>
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-white/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>5</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={companies[4]?.avatar } />
                    <p>{companies[4]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{companies[4]?.tokens} Tokens</p>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default TopCompanies