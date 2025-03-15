import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Box } from "@mui/material";
import dayjs from "dayjs";

import { DEFAULT_RACER_HEADERS } from "@/constants";
import { RacerResult, RacerTime, RaceStage, useGetResults, Racer } from "@/hooks/api/race";
import { formatMSTime } from "@/utils/date";

interface Props {
  raceId: string;
  categoryId: string;
  stages: RaceStage[];
}

const formatStageTime = (key: string, data: RacerTime[]) => {
  const stageTime = data.find((item) => item.stage.key === key);
  const diffTime = stageTime?.diffTime || 0;

  if (!stageTime) {
    return "N/A";
  }

  const startTime: string = stageTime.startTime ? dayjs(stageTime.startTime).format("hh:mm:ss a") : "";
  const finishTime: string = stageTime.finishTime ? dayjs(stageTime.finishTime).format("hh:mm:ss a") : "";

  return `${startTime} - ${finishTime}${diffTime ? ` (${formatMSTime(diffTime)})` : ""}`;
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

const ResultTab = ({ raceId: id, categoryId, stages }: Props) => {
  const { data } = useGetResults({ id, categoryId });

  const stageList = stages.map((stage) => stage.key);
  const headers = stages.reduce((acc, stage) => [...acc, { label: stage.name, key: stage.key }], DEFAULT_RACER_HEADERS);

  headers.push({ label: "Total Time", key: "totalTime", map: (data: RacerResult) => formatMSTime(data.totalTime) });
  headers.push({ label: "DNF", key: "isDNF", map: (data: RacerResult) => (data.isDNF ? "DNF" : "") });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            {headers.map((header) => (
              <TableCell key={header.key}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, key) => (
            <TableRow key={row.id}>
              <TableCell>{key + 1}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTab;
