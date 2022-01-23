import { FC } from "react";

import { Paper, IconButton } from "@mui/material";
import Popconfirm from "@/components/Popconfirm";
import { Delete, Edit } from "@mui/icons-material";
import {
  DataGrid,
  GridRenderCellParams,
  GridValueGetterParams,
  GridColDef,
} from "@mui/x-data-grid";

import dayjs from "lib/dayjs";
import { User } from "lib/types";

const columns: GridColDef[] = [
  {
    field: "firstName",
    flex: 1,
    headerName: "Ime",
    minWidth: 140,
  },
  {
    field: "lastName",
    flex: 1,
    headerName: "Prezime",
    minWidth: 140,
  },
  {
    field: "dateOfBirth",
    flex: 1,
    headerName: "Datum rodjenja",
    minWidth: 140,
    valueGetter: (params: GridValueGetterParams<User, User>) => {
      return dayjs(params.row.dateOfBirth).format("DD.MM.YYYY");
    },
  },
  {
    field: "phoneNumber",
    flex: 1,
    minWidth: 180,
    headerName: "Telefon",
  },
  {
    field: "actions",
    headerName: "Akcije",
    sortable: false,
    disableColumnMenu: true,
    width: 120,
    renderCell: (params: GridRenderCellParams<User, User>) => {
      return (
        <span>
          <IconButton size="small">
            <Edit />
          </IconButton>
          <Popconfirm onConfirm={() => console.log("delete")}>
            <IconButton size="small">
              <Delete />
            </IconButton>
          </Popconfirm>
        </span>
      );
    },
  },
];

interface UserTableProps {
  users: User[];
}

const UserTable: FC<UserTableProps> = ({ users }) => {
  return (
    <Paper>
      <DataGrid
        autoHeight
        disableSelectionOnClick
        columns={columns}
        rows={users}
      />
    </Paper>
  );
};

export default UserTable;
