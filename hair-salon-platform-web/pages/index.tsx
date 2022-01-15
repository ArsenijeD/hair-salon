import type { NextPage } from "next";

import { Container, Drawer } from "@mui/material";

import Reservations from "@/components/Reservations";
import ReservationForm from "@/components/Reservations/ReservationForm";
import ReservationHeader from "@/components/Reservations/Header";

import { Reservation } from "lib/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeIdState,
  editState,
  formState,
} from "@/components/Reservations/state";

const Home: NextPage = () => {
  const [showForm, setShowForm] = useRecoilState(formState);
  const setEditReservation = useSetRecoilState(editState);
  const setActiveId = useSetRecoilState(activeIdState);

  return (
    <>
      <ReservationHeader />
      <Container>
        <Reservations />
      </Container>
      <Drawer
        anchor="right"
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditReservation(null);
        }}
      >
        <ReservationForm
          onSuccess={(reservation: Reservation) => {
            setActiveId(reservation.id);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      </Drawer>
    </>
  );
};

export default Home;
