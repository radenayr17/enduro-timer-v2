import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@/components/button";
import { DateFormat } from "@/constants/date";
import { StageApiHooks } from "@/constants/hooks";
import { Stage, useCreateStageRecord, useGetStageRecords } from "@/hooks/api/stage";
import { formatDate } from "@/utils/date";

interface Props {
  id: Stage["id"];
}

const EventTable = ({ id }: Props) => {
  const { data, refetch } = useGetStageRecords(id);
  const { mutate } = useCreateStageRecord();
  const queryClient = useQueryClient();

  const records = data ?? [];

  console.log(id);

  const handleAddRecord = () => {
    mutate(
      {
        id,
        body: { time: dayjs().toISOString() },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(StageApiHooks.getStageRecords);
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      }
    );
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Button color="success" onClick={handleAddRecord}>
          Add Record
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Racer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{formatDate(row.time, DateFormat.hhmmsssA)}</TableCell>
                <TableCell>
                  {row.stage.name} - {row.race.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default EventTable;
