"use client";
import { Typography } from "@mui/material";

import { useGetRaces } from "@/hooks/api/race";

import Table from "./table";

const RacersPage = () => {
  return (
    <>
      <Typography variant="h3">Race</Typography>
      <Table />
    </>
  );
};

export default RacersPage;
