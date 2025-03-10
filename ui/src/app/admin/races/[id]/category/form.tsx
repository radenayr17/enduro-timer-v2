import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { Formik } from "formik";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@/components/button";
import TextInput from "@/components/text-input";
import { RaceApiHooks } from "@/constants/hooks";
import { useCreateCategory } from "@/hooks/api/race";
import useToggle from "@/hooks/use-toggle";
import { categoryFormSchema, categoryValuesType, catetoryInitialValues } from "@/validators/category-form.yup";

interface Props {
  id: string;
}

const CategoryForm = ({ id }: Props) => {
  const { toggle, onToggle } = useToggle(false);
  const { mutate } = useCreateCategory();
  const queryClient = useQueryClient();

  const handleClose = () => onToggle(false);
  const handleSubmit = (values) => {
    mutate(
      { id, body: values },
      {
        onSuccess: () => {
          toast.success("Category created successfully");

          queryClient.invalidateQueries(RaceApiHooks.getRace);

          handleClose();
        },
      }
    );
  };

  return (
    <>
      <Button variant="contained" onClick={() => onToggle(true)}>
        Add Category
      </Button>
      <Dialog open={toggle} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Category</DialogTitle>
        <DialogContent>
          <Formik<categoryValuesType>
            initialValues={catetoryInitialValues}
            validationSchema={categoryFormSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, submitForm, touched, handleChange }) => (
              <Stack spacing={2} mt={2} gap={1}>
                <Box>
                  <TextInput
                    name="name"
                    label="Name"
                    fullWidth
                    value={values.name}
                    error={!!(touched.name && errors.name)}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <Stack direction="row" gap={1} justifyContent="flex-end">
                    <Button onClick={handleClose} color="error">
                      Cancel
                    </Button>
                    <Button onClick={submitForm}>Save and Exit</Button>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryForm;
