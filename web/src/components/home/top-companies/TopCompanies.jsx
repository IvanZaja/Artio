import { useEffect, useState } from "react"
import * as ArtioApi from '../../../services/api.service';
import { Avatar, Card } from "@nextui-org/react";

import './TopCompanies.css';


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
    <>
        <div className="w-full flex justify-center">
            <div className="w-[1254px]">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold mt-20 mb-12">Top contributors</h2>
                    <p className="text-lg text-center">We thank the companies that collaborate with Artio projects. Without them we would not be able to eliminate CO₂ in such <br/>an effective way. That&apos;s why we proudly show our top contributors in this section.</p>
                </div>
            </div>
        </div>
        <div className="logos flex items-center">
            <div className="logos-slide flex whitespace-nowrap">
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[0]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[1]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[2]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[3]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[4]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[5]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[6]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[7]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[8]?.avatar }/>
            </div>
            <div className="logos-slide flex whitespace-nowrap">
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[0]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[1]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[2]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[3]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[4]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[5]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[6]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[7]?.avatar }/>
                <Avatar className="w-[100px] h-[100px] mx-16" src={companies[8]?.avatar }/>
            </div>
        </div>
    </>
  )
}

export default TopCompanies