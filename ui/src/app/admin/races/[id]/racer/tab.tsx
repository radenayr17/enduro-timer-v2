import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useQueryClient } from "react-query";

import ConfirmDialog from "@/components/confirm-dialog";
import { Race, useGetRacers } from "@/hooks/api/race";
import { DEFAULT_RACER_HEADERS } from "@/constants";

interface Props {
  data: Race;
}

const Racer = ({ data }: Props) => {
  const { id: raceId, RaceStage: stages } = data;
  const { data: racers } = useGetRacers({ id: raceId });
  const queryClient = useQueryClient();

  const records = racers?.data ?? [];
  const headers = stages.reduce((acc, stage) => [...acc, { label: stage.name, key: stage.key }], DEFAULT_RACER_HEADERS);

  const handleDelete = (id: string) => {};

  return (
    <Stack spacing={2} mt={2}>
      <Box sx={{ with: 150 }}></Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.key}>{header.label}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.number}</TableCell>
                <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                <TableCell>
                  <ConfirmDialog
                    btnText="Delete"
                    text="Are you sure you want to delete?"
                    title={`Delete '${row.number} - ${row.firstName} ${row.lastName}'`}
                    onConfirm={() => handleDelete(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Racer;
