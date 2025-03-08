"use client";
import { Box, Stack, Typography } from "@mui/material";

import { RaceFormModal } from "./form";
import Table from "./table";

const RacersPage = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Race</Typography>
        <RaceFormModal />
      </Stack>
      <Table />
    </Box>
  );
};

export default RacersPage;
