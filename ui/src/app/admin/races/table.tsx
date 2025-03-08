import { Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/confirm-dialog";
import { DateFormat } from "@/constants/date";
import { useGetRaces, useDeleteRace } from "@/hooks/api/race";
import { formatDate } from "@/utils/date";
import { RaceApiHooks } from "@/constants/hooks";

const RacesTable = () => {
  const { data } = useGetRaces();
  const { mutate: deleteRace } = useDeleteRace();
  const queryClient = useQueryClient();
  const records = data?.data ?? [];

  const handleDelete = (id: string) => {
    deleteRace(id, {
      onSuccess: () => {
        toast.success("Race deleted successfully");

        queryClient.invalidateQueries(RaceApiHooks.getRaces);
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link href={`/admin/races/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{formatDate(row.from, DateFormat.mmDDyyyy)}</TableCell>
              <TableCell>{formatDate(row.from, DateFormat.mmDDyyyy)}</TableCell>
              <TableCell>
                <ConfirmDialog
                  btnText="Delete"
                  text="Are you sure you want to delete?"
                  title={`Delete '${row.name}'`}
                  onConfirm={() => handleDelete(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RacesTable;
