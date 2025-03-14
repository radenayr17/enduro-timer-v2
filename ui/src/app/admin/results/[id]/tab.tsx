import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";

import { DEFAULT_RACER_HEADERS } from "@/constants";
import { RacerResult, RacerTime, RaceStage, useGetResults } from "@/hooks/api/race";
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

  return `${startTime} - ${finishTime}${diffTime ? `(${formatMSTime(diffTime)})` : ""}`;
};

const formatTotalTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours ? `${hours}h` : ""} ${minutes}m ${remainingSeconds}s`;
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
            {headers.map((header) => (
              <TableCell key={header.key}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              {headers.map((header) => {
                const value = stageList.includes(header.key)
                  ? formatStageTime(header.key, row.RacerTime)
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
