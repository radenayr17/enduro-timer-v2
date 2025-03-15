"use client";
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import AutoComplete from "@/components/autocomplete";
import Button from "@/components/button";
import ConfirmDialog from "@/components/confirm-dialog";
import { DateFormat } from "@/constants/date";
import { StageApiHooks } from "@/constants/hooks";
import { Racer } from "@/hooks/api/race";
import {
  Stage,
  useAssignStageRecord,
  useCreateStageRecord,
  useDeleteStageRecord,
  useGetStageRecords,
} from "@/hooks/api/stage";
import { formatDate, formatMSTime } from "@/utils/date";

interface Props {
  id: Stage["id"];
  racers: Racer[];
}

const EventTable = ({ id, racers }: Props) => {
  const { data } = useGetStageRecords(id);
  const { mutate: addStageRecord } = useCreateStageRecord();
  const { mutate: deleteStageRecord } = useDeleteStageRecord();
  const { mutate: assignStageRecord } = useAssignStageRecord();
  const queryClient = useQueryClient();

  const records = data ?? [];
  const racersOptions = racers.map((racer) => ({
    label: `${racer.number} - ${racer.firstName} ${racer.lastName}`,
    value: racer.id,
  }));

  const handleDelete = (recordId) => {
    deleteStageRecord(
      { id, subId: recordId },
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

  const handleAddRecord = () => {
    addStageRecord(
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

  const handleAssignRacer = (recordId, racerId) => {
    assignStageRecord(
      { id, recordId, body: { racerId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(StageApiHooks.getStageRecords);

          toast.success("Racer assigned successfully");
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.racerTime && row.racerTime.length
                    ? `${formatDate(row.racerTime[0].startTime, DateFormat.hhmmssA)} - `
                    : ""}
                  <strong>{formatDate(row.time, DateFormat.hhmmsssA)}</strong>
                  {row.racerTime && row.racerTime.length ? ` (${formatMSTime(row.racerTime[0].diffTime)})` : ""}
                </TableCell>
                <TableCell width={100}>{row.stage.name}</TableCell>
                <TableCell width={400}>
                  <AutoComplete
                    size="small"
                    options={racersOptions}
                    value={row.racerId ?? ""}
                    disableClearable
                    onChange={(value) => handleAssignRacer(row.id, value)}
                  />
                </TableCell>
                <TableCell width={100}>
                  <ConfirmDialog
                    size="small"
                    btnText="Delete"
                    text="Are you sure you want to delete?"
                    title={`Delete '${formatDate(row.time, DateFormat.hhmmsssA)}'`}
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

export default EventTable;
