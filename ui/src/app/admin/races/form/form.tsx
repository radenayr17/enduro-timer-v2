import { Box, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@/components/button";
import TextInput from "@/components/text-input";
import { RaceApiHooks } from "@/constants/hooks";
import { useCreateRace, useUpdateRace } from "@/hooks/api/race";
import { raceFormSchema, raceInitialValues, raceValuesType } from "@/validators/race-form.yup";

interface Props {
  onSuccess?: () => void;
  onClose?: () => void;
  isModal?: boolean;
  initialData?: Partial<raceValuesType>;
  id?: string;
}

const Form = ({ onSuccess = () => {}, onClose = () => {}, isModal = false, initialData = {}, id = null }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: create } = useCreateRace();
  const { mutate: update } = useUpdateRace();
  const isUpdate = !!id;

  const handleSuccess = () => {
    queryClient.invalidateQueries(RaceApiHooks.getRaces);

    toast.success(isUpdate ? "Race updated successfully" : "Race created successfully");

    onSuccess();
  };

  const handleError = (err: Error) => {
    toast.error(err.message);
  };

  const handleSubmit = (values) => {
    if (isUpdate) {
      update(
        { id, body: values },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        }
      );
    } else {
      create(values, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  return (
    <Formik<raceValuesType>
      initialValues={{ ...raceInitialValues, ...initialData }}
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
              {isModal && (
                <Button onClick={onClose} color="error">
                  Cancel
                </Button>
              )}
              <Button onClick={submitForm}>{isModal ? "Save and Exit" : "Save"}</Button>
            </Stack>
          </Box>
        </Stack>
      )}
    </Formik>
  );
};

export default Form;
