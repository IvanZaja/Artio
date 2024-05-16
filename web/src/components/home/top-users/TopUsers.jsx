import { Avatar, Button, Card, Chip } from "@nextui-org/react"
import { useEffect, useState } from "react"
import * as ArtioApi from '../../../services/api.service';
import UserItem from "./user-item/UserItem";


function TopUsers({ limit }) {

    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const query = {};
                if (limit) query.limit = limit;

                const { data: response} = await ArtioApi.getUsers(query);
                const hosts = response.filter(user => user.role === 'host')
                .sort((a, b) => b.tokens - a.tokens)
                .filter((_,index) => limit ? index < limit : true)

                setHosts(hosts);
                console.log(hosts)
            } catch (error) {
                console.error(error);
            }
          }
          fetch();
    }, [limit])

  return (
    <div className="w-4/5 ">
        <div className="mt-12 flex items-center justify-between">
            <h2 className="ml-10 text-white font-bold">Top partners</h2>
        </div>
        <div className="mt-6 mb-12 flex flex-col gap-3 items-center justify-center">
        <Card variant="shadow" classNames={{
                base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-[#FFD700]/50 shadow-[#e3e3e3]/30",
                content: "drop-shadow shadow-black text-[#696969]",
            }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>1</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={hosts[0]?.avatar } />
                    <p>{hosts[0]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{hosts[0]?.tokens} Tokens</p>
                </div>
            </Card> 
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-[#C0C0C0]/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>2</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={hosts[1]?.avatar } />
                    <p>{hosts[1]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{hosts[1]?.tokens} Tokens</p>
                </div>
            </Card> 
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-[#CD7F32]/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>3</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={hosts[2]?.avatar } />
                    <p>{hosts[2]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{hosts[2]?.tokens} Tokens</p>
                </div>
            </Card>
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-white/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>4</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={hosts[3]?.avatar } />
                    <p>{hosts[3]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{hosts[3]?.tokens} Tokens</p>
                </div>
            </Card>
            <Card variant="shadow" classNames={{
                        base: "bg-gradient-to-br from-[#e3e3e3] to-[#ffffff] border-small border-white/50 shadow-[#e3e3e3]/30",
                        content: "drop-shadow shadow-black text-[#696969]",
                    }} className="flex flex-row justify-between items-center w-4/5 rounded-full">
                <div className="flex items-center gap-5 ml-5 my-2">
                    <p>5</p>
                    <Avatar radius="full" className={`w-10 h-10 border-3 text-large`} src={hosts[4]?.avatar } />
                    <p>{hosts[4]?.name }</p>
                </div>
                <div className="mr-5">
                    <p>{hosts[4]?.tokens} Tokens</p>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default TopUsers