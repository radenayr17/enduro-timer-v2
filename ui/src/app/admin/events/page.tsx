"use client";
import { Box, Stack, Typography } from "@mui/material";

import Table from "./table";

const EventsPage = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Event Stages</Typography>
      </Stack>
      <Table />
    </Box>
  );
};

export default EventsPage;
