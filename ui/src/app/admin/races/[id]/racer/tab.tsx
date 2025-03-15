import {
  Box,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@/components/button";
import ConfirmDialog from "@/components/confirm-dialog";
import { DEFAULT_RACER_HEADERS } from "@/constants";
import { racersFiltersParamsKeys, RacersFiltersParamValues } from "@/constants/filters";
import { RaceApiHooks } from "@/constants/hooks";
import { Race, Racer, RacerTime, useDeleteRacer, useGetRacers } from "@/hooks/api/race";
import { useFilters } from "@/hooks/use-filters";
import Select from "@/components/select";

import Form from "./form";
import { useEffect } from "react";

interface Props {
  data: Race;
}

const formatStageTime = (key: string, data: RacerTime[]) => {
  const stageTime = data.find((item) => item.stage.key === key);

  if (!stageTime) {
    return "N/A";
  }

  const startTime: string = stageTime.startTime ? dayjs(stageTime.startTime).format("hh:mm:ss A") : "";
  const finishTime: string = stageTime.finishTime ? dayjs(stageTime.finishTime).format("hh:mm:ss A") : "";

  return startTime;
};

const formatName = (data: Racer) => {
  return (
    <Stack>
      <Box>
        {data.firstName} {data.lastName}
      </Box>
      <Box>
        <strong>Teams</strong>: {data.teams}
      </Box>
      <Box>
        <strong>Address</strong>: {data.address}
      </Box>
    </Stack>
  );
};

const RacerTab = ({ data }: Props) => {
  const { id: raceId, RaceStage: stages, RaceCategory } = data;

  const queryClient = useQueryClient();
  const { filters, createQueryString } = useFilters<RacersFiltersParamValues>(racersFiltersParamsKeys);
  const { data: racers, refetch } = useGetRacers({ id: raceId, ...filters });
  const { mutate: deleteRacer } = useDeleteRacer();

  const records = racers?.data ?? [];
  const headers = stages.reduce((acc, stage) => [...acc, { label: stage.name, key: stage.key }], DEFAULT_RACER_HEADERS);
  const stageList = stages.map((stage) => stage.key);
  const categories = RaceCategory.map((category) => ({ label: category.name, value: category.id }));

  useEffect(() => {
    refetch();
  }, [filters.categoryId]);

  const handleRefresh = () => queryClient.invalidateQueries(RaceApiHooks.getRacers);

  const handleDelete = (id: string) => {
    deleteRacer(
      { id: raceId, subId: id },
      {
        onSuccess: () => {
          handleRefresh();
        },
        onError: (err) => {
          toast.error((err as Error).message);
        },
      }
    );
  };

  const handleCategory = (e: SelectChangeEvent) => createQueryString(["categoryId"], [e.target.value]);

  const handleResetFilters = () => createQueryString(["categoryId"], [""]);

  return (
    <Stack spacing={2} mt={2}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack spacing={1} direction="row">
          <Form data={data} />
          <Button onClick={handleRefresh} color="success">
            Refresh
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Box minWidth={200}>
            <Select size="small" options={categories} onChange={handleCategory} value={filters.categoryId} />
          </Box>
          <Button onClick={handleResetFilters} color="success">
            Reset Filters
          </Button>
        </Stack>
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="simple table dense">
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
                {headers.map((header) => {
                  const value = stageList.includes(header.key)
                    ? formatStageTime(header.key, row.RacerTime)
                    : header.key === "name"
                    ? formatName(row)
                    : header.map
                    ? header.map(row)
                    : row[header.key];
                  return <TableCell key={`${row.id}-${header.key}`}>{value}</TableCell>;
                })}
                <TableCell>
                  <ConfirmDialog
                    btnText="Delete"
                    text="Are you sure you want to delete?"
                    title={`Delete racer '${row.firstName} ${row.lastName}(Race#${row.number})'`}
                    onConfirm={() => handleDelete(row.id)}
                    size="small"
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

export default RacerTab;
