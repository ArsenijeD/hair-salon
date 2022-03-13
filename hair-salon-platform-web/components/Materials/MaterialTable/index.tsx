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
import { useMutation, useQueryClient } from "react-query";

import { deleteMaterial } from "api";
import { Material } from "lib/types";
import { useSetRecoilState } from "recoil";
import { editState } from "../state";

interface MaterialTableProps {
  materials: Material[];
}

const MaterialTable: FC<MaterialTableProps> = ({ materials }) => {
  const setEditMaterial = useSetRecoilState(editState);
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation(
    (id: number) => deleteMaterial(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["materials"]);
      },
    }
  );

  const columns: GridColDef[] = [
    {
      field: "name",
      flex: 1,
      headerName: "Ime",
      minWidth: 140,
    },
    {
      field: "brand",
      flex: 1,
      headerName: "Brand",
      minWidth: 140,
    },
    {
      field: "numberInStock",
      flex: 1,
      headerName: "Lager",
    },
    {
      field: "price",
      flex: 1,
      minWidth: 180,
      headerName: "Cena",
      valueGetter: (params: GridValueGetterParams<Material, Material>) => {
        return params.row.price + " din";
      },
    },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      disableColumnMenu: true,
      width: 120,
      renderCell: (params: GridRenderCellParams<Material, Material>) => {
        return (
          <span>
            <IconButton
              size="small"
              onClick={() => setEditMaterial(params.row)}
            >
              <Edit />
            </IconButton>
            <Popconfirm onConfirm={() => handleDelete(params.row.id)}>
              <IconButton size="small">
                <Delete />
              </IconButton>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <Paper>
      <DataGrid
        autoHeight
        disableSelectionOnClick
        columns={columns}
        rows={materials}
      />
    </Paper>
  );
};

export default MaterialTable;
