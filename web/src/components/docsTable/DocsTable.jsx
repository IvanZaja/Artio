import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react';
import { useContext, useEffect, useMemo, useState } from 'react'
import AuthContext from "../../contexts/auth.context"


function DocsTable() {
    const { userLoged } = useContext(AuthContext)


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
    <div>
        <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>
      <TableBody>
      
        {userLoged?.docs?.map((doc, index) => {
            const date = doc?.split('/')[9]?.split('.')[0];
            return (
                <TableRow key={index}>
                    <TableCell>
                        <a href={doc}>Comprobante {date}</a>
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