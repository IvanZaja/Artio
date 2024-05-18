import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react';
import { useContext, useEffect, useMemo, useState } from 'react'
import AuthContext from "../../contexts/auth.context"
import Download01Icon from '../icons/download-01-stroke-rounded';


function DocsTable() {
    const { userLoged } = useContext(AuthContext)
    const [selectedColor, setSelectedColor] = useState("default");

    useEffect(() => {
        async function fetch() {
            try {
                console.log(userLoged?.docs)
            } catch (error) {
                console.error(error);
            } 
          }
          fetch();
    }, [userLoged]);

  return (
    <div className='my-5'>
        <Table aria-label="Example static collection table" 
            color={selectedColor}
            selectionMode="single" 
            defaultSelectedKeys={["2"]} >
            <TableHeader>
                <TableColumn>NAME</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No documents to display."}>
                {userLoged?.docs?.slice().reverse().map((doc, index) => {
                    const date = doc?.split('/')[9]?.split('-', 3);
                    return (
                        <TableRow key={index}>
                            <TableCell className='flex justify-between items-center'>
                                <h6 className='mt-3'><a href={doc} className='' target="_blank">Receipt {date} - {index}</a></h6>
                                <a href={doc} target="_blank"><Download01Icon/></a>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </div>
  )
}

export default DocsTable