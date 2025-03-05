import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@/components/button";
import TextInput from "@/components/text-input";
import useToggle from "@/hooks/use-toggle";
import { raceFormSchema, raceInitialValues, raceValuesType } from "@/validators/race-form.yup";
import { useCreateRace } from "@/hooks/api/race";
import { RaceApiHooks } from "@/constants/hooks";

const RaceForm = () => {
  const queryClient = useQueryClient();
  const { toggle, onToggle } = useToggle(false);
  const { mutate } = useCreateRace();

  const handleClose = () => onToggle(false);

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(RaceApiHooks.getRaces);

        toast.success(`Race ${data.name} created successfully`);

        handleClose();
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => onToggle(true)}>
        Add Race
      </Button>
      <Dialog open={toggle} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Race</DialogTitle>
        <DialogContent>
          <Formik<raceValuesType>
            initialValues={raceInitialValues}
            validationSchema={raceFormSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, submitForm, touched, handleChange, setFieldValue }) => (
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
                  <TextInput
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={5}
                    value={values.description}
                    error={!!(touched.description && errors.description)}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <DatePicker
                    label="From"
                    value={dayjs(values.from)}
                    onChange={(value) => (value.isValid() ? setFieldValue("from", value.toISOString()) : {})}
                  />
                </Box>
                <Box>
                  <DatePicker
                    label="To"
                    value={dayjs(values.to)}
                    onChange={(value) => (value.isValid() ? setFieldValue("to", value.toISOString()) : {})}
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

export default RaceForm;
