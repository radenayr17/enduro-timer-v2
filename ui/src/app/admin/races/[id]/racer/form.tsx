import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { Formik, getIn } from "formik";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Fragment } from "react";

import Button from "@/components/button";
import Select from "@/components/select";
import TextInput from "@/components/text-input";
import { RaceApiHooks } from "@/constants/hooks";
import { Race, useCreateRacer } from "@/hooks/api/race";
import useToggle from "@/hooks/use-toggle";
import { racerFormSchema, racerInitialValues, racerValuesType } from "@/validators/racer-form.yup";
import { DateFormat } from "@/constants/date";

interface Props {
  data: Race;
}

const RacerForm = ({ data }: Props) => {
  const { toggle, onToggle } = useToggle(false);
  const { mutate } = useCreateRacer();
  const queryClient = useQueryClient();

  const { id, from, RaceCategory, RaceStage: stages } = data;
  const categories = RaceCategory.map((category) => ({ label: category.name, value: category.id }));

  const handleClose = () => onToggle(false);

  const handleSubmit = (values) => {
    const body = {
      ...values,
      stages: values.stages.map((stage) => {
        const { stageId, startDate, startTime } = stage;
        const startingTime = dayjs(startDate)
          .set("hour", dayjs(startTime).hour())
          .set("minute", dayjs(startTime).minute())
          .set("second", dayjs(startTime).second());
        return {
          stageId,
          startTime: startingTime.toISOString(),
        };
      }),
    };

    mutate(
      { id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(RaceApiHooks.getRacers);

          toast.success("Racer created successfully");

          handleClose();
        },
        onError: (err) => {
          toast.error((err as Error).message);
        },
      }
    );
  };

  const initialValues = {
    ...racerInitialValues,
    stages: stages.map((stage) => ({
      stageId: stage.id,
      startDate: from,
      startTime: null,
    })),
  };

  return (
    <>
      <Button variant="contained" onClick={() => onToggle(true)}>
        Add Racer
      </Button>
      <Dialog open={toggle} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Racer</DialogTitle>
        <DialogContent>
          <Formik<racerValuesType>
            initialValues={initialValues}
            validationSchema={racerFormSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, submitForm, touched, handleChange, setFieldValue }) => {
              return (
                <Stack spacing={2} mt={2} gap={1}>
                  <Box>
                    <TextInput
                      name="firstName"
                      label="First Name"
                      fullWidth
                      value={values.firstName}
                      error={!!(touched.firstName && errors.firstName)}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box>
                    <TextInput
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      value={values.lastName}
                      error={!!(touched.lastName && errors.lastName)}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box>
                    <TextInput
                      name="number"
                      label="Number"
                      fullWidth
                      value={values.number}
                      error={!!(touched.number && errors.number)}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box>
                    <Select
                      label="Category"
                      value={values.categoryId}
                      options={categories}
                      error={!!(touched.categoryId && errors.categoryId)}
                      onChange={(e) => setFieldValue("categoryId", e.target.value)}
                    />
                  </Box>
                  {stages.map((stage, key) => {
                    const startDate = getIn(values, `stages[${key}].startDate`)
                      ? dayjs(getIn(values, `stages[${key}].startDate`))
                      : null;
                    const startTime = getIn(values, `stages[${key}].startTime`)
                      ? dayjs(getIn(values, `stages[${key}].startTime`))
                      : null;

                    return (
                      <Fragment key={stage.id}>
                        <input
                          type="hidden"
                          name={`stages[${key}].stageId`}
                          value={getIn(values, `stages[${key}].stageId`)}
                        />
                        <Stack key={stage.id} direction="row" spacing={1}>
                          <DatePicker
                            label={`${stage.name} Date`}
                            value={startDate}
                            onChange={(value) =>
                              value.isValid() ? setFieldValue(`stages[${key}].startDate`, value.toISOString()) : {}
                            }
                          />
                          <TimePicker
                            name={`stages[${key}].startTime`}
                            label={`${stage.name} Time`}
                            value={startTime}
                            views={["hours", "minutes", "seconds"]}
                            format={DateFormat.hhmmssA}
                            onChange={(value) =>
                              value.isValid() ? setFieldValue(`stages[${key}].startTime`, value.toISOString()) : {}
                            }
                          />
                        </Stack>
                      </Fragment>
                    );
                  })}
                  <Box>
                    <Stack direction="row" gap={1} justifyContent="flex-end">
                      <Button onClick={handleClose} color="error">
                        Cancel
                      </Button>
                      <Button onClick={submitForm}>Save and Exit</Button>
                    </Stack>
                  </Box>
                </Stack>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RacerForm;
