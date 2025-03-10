import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Box } from "@mui/material";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import ConfirmDialog from "@/components/confirm-dialog";
import { RaceApiHooks } from "@/constants/hooks";
import { Race, useDeleteCategory } from "@/hooks/api/race";

import Form from "./form";

interface Props {
  data: Race;
}

const Category = ({ data }: Props) => {
  const records = data.RaceCategory ?? [];
  const { mutate } = useDeleteCategory();
  const queryClient = useQueryClient();

  const handleDelete = (subId: string) => {
    mutate(
      { id: data.id, subId },
      {
        onSuccess: () => {
          toast.success("Category deleted successfully");

          queryClient.invalidateQueries(RaceApiHooks.getRace);
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      }
    );
  };

  return (
    <Stack spacing={2} mt={2}>
      <Box sx={{ with: 150 }}>
        <Form id={data.id} />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.key}</TableCell>
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
    </Stack>
  );
};

export default Category;
