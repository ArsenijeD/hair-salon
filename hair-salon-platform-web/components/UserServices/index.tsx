import { FC, useEffect } from "react";

import { useQueryClient, useQuery, useMutation } from "react-query";
import isEmpty from "lodash/isEmpty";
import { Paper, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import clsx from "clsx";

import {
  DataGrid,
  GridRenderCellParams,
  GridValueGetterParams,
  GridCellParams,
  GridColDef,
} from "@mui/x-data-grid";
import { useSetRecoilState } from "recoil";

import Loading from "@/components/Loading";
import PercentageForm from "@/components/UserServices/PercentageForm";
import Popconfirm from "@/components/Popconfirm";

import { excludeServicesState } from "./state";
import { getUserServices, deleteUserService } from "api";
import { LENGTH, TYPES_OF_SERVICE } from "lib/constants";
import { UserService } from "lib/types";
import styles from "./styles.module.scss";

const Services: FC<{ workerId: number }> = ({ workerId }) => {
  const setExcludeServices = useSetRecoilState(excludeServicesState);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["userServices", workerId],
    () => getUserServices(workerId),
    {
      onSuccess: (res) => {
        if (!isEmpty(res.data)) {
          setExcludeServices(
            res.data.map((service) => service.hairsalonService.id)
          );
        } else {
          setExcludeServices([]);
        }
      },
    }
  );
  const services = data?.data;

  // Delete
  const { mutate: handleDelete } = useMutation(
    (id: number) => deleteUserService(workerId, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userServices", workerId]);
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!services || isEmpty(services)) {
    return (
      <Typography variant="h5" sx={{ mt: 5 }}>
        Ne postoje usluge za ovog radnika
      </Typography>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      flex: 1,
      headerName: "Usluga",
      valueGetter: (
        params: GridValueGetterParams<UserService, UserService>
      ) => {
        return TYPES_OF_SERVICE[params.row.hairsalonService.name];
      },
      minWidth: 120,
    },
    {
      field: "length",
      flex: 1,
      headerName: "Dužina",
      valueGetter: (
        params: GridValueGetterParams<UserService, UserService>
      ) => {
        return LENGTH[params.row.hairsalonService.length];
      },
      minWidth: 140,
    },
    {
      field: "price",
      flex: 1,
      minWidth: 180,
      headerName: "Cena",
      valueGetter: (
        params: GridValueGetterParams<UserService, UserService>
      ) => {
        return params.row.hairsalonService.price;
      },
    },
    {
      field: "percentage",
      flex: 1,
      minWidth: 180,
      headerName: "Procenat",
      cellClassName: (params: GridCellParams<number>) =>
        clsx("percentage", {
          [styles.red]: params.value > 0 && params.value < 10,
          [styles.orange]: params.value >= 10 && params.value < 20,
          [styles.blue]: params.value >= 20,
        }),
      renderCell: (params: GridRenderCellParams<UserService, UserService>) => (
        <PercentageForm
          workerId={workerId}
          serviceId={params.row.hairsalonService.id}
          percentage={params.row.percentage}
        ></PercentageForm>
      ),
    },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      disableColumnMenu: true,
      width: 80,
      renderCell: (params: GridRenderCellParams<UserService, UserService>) => {
        return (
          <span>
            <Popconfirm
              onConfirm={() => handleDelete(params.row.hairsalonService.id)}
            >
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
    <>
      {services && (
        <Paper>
          <DataGrid
            autoHeight
            disableSelectionOnClick
            columns={columns}
            rows={services}
          />
        </Paper>
      )}
    </>
  );
};

export default Services;
