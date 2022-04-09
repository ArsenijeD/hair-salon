import { FC, useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { Typography } from "@mui/material";

import { authState } from "@/components/AuthGuard/state";
import { FinalizedService, UsedMaterial } from "lib/types";
import styles from "./styles.module.scss";

interface SummaryProps {
  finalizedServices: FinalizedService[];
  usedMaterials: UsedMaterial[];
}

const Summary: FC<SummaryProps> = ({ finalizedServices, usedMaterials }) => {
  const { isAdmin } = useRecoilValue(authState);
  const [summaryData, setSummaryData] = useState<{
    workerIncome: number;
    salonIncome: number;
    materials: number;
    totalIncome: number;
  }>({
    workerIncome: 0,
    salonIncome: 0,
    materials: 0,
    totalIncome: 0,
  });

  useEffect(() => {
    let workerIncome = 0;
    let salonIncome = 0;
    let totalIncome = 0;

    finalizedServices?.forEach((item) => {
      workerIncome +=
        (item.userHairsalonService.percentage *
          item.userHairsalonService.hairsalonService.price) /
        100;

      salonIncome += item.userHairsalonService.hairsalonService.price;
    });

    const materials = usedMaterials?.reduce(
      (prev, current) => prev + current.material.price * current.materialSpent,
      0
    );

    totalIncome = salonIncome - workerIncome - materials;

    setSummaryData({
      workerIncome,
      salonIncome,
      materials,
      totalIncome,
    });
  }, [finalizedServices, usedMaterials]);

  return (
    <>
      <Typography variant="subtitle1">
        Ukupna zarada radnika:{" "}
        <span className={styles.alignRight}>
          {summaryData.workerIncome} din
        </span>
      </Typography>
      {isAdmin && (
        <>
          <Typography variant="subtitle1">
            Ukupna zarada salona:{" "}
            <span className={styles.alignRight}>
              {summaryData.salonIncome} din
            </span>
          </Typography>
          <Typography variant="subtitle1">
            Utroseno na materijal:{" "}
            <span className={styles.alignRight}>
              {summaryData.materials} din
            </span>
          </Typography>
          <Typography variant="subtitle1">
            Prihod Salona:{" "}
            <span className={styles.alignRight}>
              {summaryData.totalIncome} din
            </span>
          </Typography>{" "}
        </>
      )}
    </>
  );
};

export default Summary;
