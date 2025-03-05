"use client";
import { Box, Stack, Typography } from "@mui/material";

import Form from "./form";
import Table from "./table";

const RacersPage = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Race</Typography>
        <Form />
      </Stack>
      <Table />
    </Box>
  );
};

export default RacersPage;
