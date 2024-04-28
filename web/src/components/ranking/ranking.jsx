import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EyeFilledIcon} from "../icons/EyeFilledIcon";
import {columns, users} from "./data";
import { useCallback } from "react";


function Ranking() {
    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
          case "name":
            return (
              <User
                avatarProps={{radius: "full", src: user.avatar}}
                description={user.email}
                name={cellValue}
              >
                {user.email}
              </User>
            );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeFilledIcon />
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default Ranking;