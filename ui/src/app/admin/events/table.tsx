import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Link from "next/link";

import { DateFormat } from "@/constants/date";
import { useGetStages } from "@/hooks/api/stage";
import { formatDate } from "@/utils/date";

const EventsTable = () => {
  const { data } = useGetStages();
  const records = data?.data ?? [];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stage</TableCell>
            <TableCell>Race</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Number of Racer Recorded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Typography color="text">
                  <Link href={`/admin/events/${row.id}`}>{row.name}</Link>
                </Typography>
              </TableCell>
              <TableCell>{row.race.name}</TableCell>
              <TableCell>{formatDate(row.race.from, DateFormat.mmDDyyyy)}</TableCell>
              <TableCell>{row._count.RaceRecord}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;
