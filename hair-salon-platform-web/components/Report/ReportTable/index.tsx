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

import { deleteFinalizedServices } from "api";
import { FinalizedService } from "lib/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dateState, editState, workerState } from "../state";
import { LENGTH, TYPES_OF_SERVICE } from "lib/constants";
import MaterialsDetails from "../MaterialsDetails";

interface MaterialTableProps {
  finalizedServices: FinalizedService[];
}

const FinalizedServicesTable: FC<MaterialTableProps> = ({
  finalizedServices,
}) => {
  const setEdit = useSetRecoilState(editState);
  const workerId = useRecoilValue(workerState)?.id;
  const dateString = useRecoilValue(dateState)?.toISOString();

  const queryClient = useQueryClient();
  const { mutate: handleDelete } = useMutation(
    (id: number) => deleteFinalizedServices(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "finalized-services",
          workerId,
          dateString,
        ]);
      },
    }
  );

  const columns: GridColDef[] = [
    {
      field: "userHairsalonService",
      flex: 1,
      headerName: "Usluga",
      minWidth: 140,
      valueGetter: (
        params: GridValueGetterParams<FinalizedService, FinalizedService>
      ) =>
        TYPES_OF_SERVICE[params.row.userHairsalonService.hairsalonService.name],
    },
    {
      field: "customer",
      flex: 1,
      headerName: "Mušterija",
      minWidth: 140,
      valueGetter: (
        params: GridValueGetterParams<FinalizedService, FinalizedService>
      ) => {
        const { customer } = params.row;
        return `${customer.firstName} ${customer.lastName}`;
      },
    },
    {
      field: "userHairsalonService.hairsalonService.length",
      flex: 1,
      headerName: "Dužina",
      minWidth: 140,
      valueGetter: (
        params: GridValueGetterParams<FinalizedService, FinalizedService>
      ) => LENGTH[params.row.userHairsalonService.hairsalonService.length],
    },
    {
      field: "material",
      flex: 1,
      minWidth: 140,
      headerName: "Materijal",
      renderCell: (
        params: GridRenderCellParams<FinalizedService, FinalizedService>
      ) => {
        return <MaterialsDetails finalizedServiceId={params.row.id} />;
      },
    },
    {
      field: "userHairsalonService.hairsalonService.price",
      flex: 1,
      minWidth: 120,
      headerName: "Cena",
      valueGetter: (
        params: GridValueGetterParams<FinalizedService, FinalizedService>
      ) => params.row.userHairsalonService.hairsalonService.price,
    },
    {
      field: "userHairsalonService.hairsalonService.percentage",
      flex: 1,
      headerName: "Zarada radnika",
      minWidth: 140,
      valueGetter: (
        params: GridValueGetterParams<FinalizedService, FinalizedService>
      ) => {
        const { userHairsalonService } = params.row;
        return (
          (userHairsalonService.percentage *
            userHairsalonService.hairsalonService.price) /
          100
        );
      },
    },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      disableColumnMenu: true,
      width: 80,
      renderCell: (
        params: GridRenderCellParams<FinalizedService, FinalizedService>
      ) => {
        return (
          <span>
            <IconButton size="small" onClick={() => setEdit(params.row)}>
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
        rows={finalizedServices}
      />
    </Paper>
  );
};

export default FinalizedServicesTable;
