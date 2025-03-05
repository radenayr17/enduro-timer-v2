import dayjs from "dayjs";
import * as Yup from "yup";

export const raceFormSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  description: Yup.string().required("Description is required."),
  from: Yup.string().required("From is required."),
  to: Yup.string().required("To is required."),
});

export type raceValuesType = Yup.InferType<typeof raceFormSchema>;

export const raceInitialValues: raceValuesType = {
  name: "",
  description: "",
  from: dayjs().startOf("day").toISOString(),
  to: dayjs().endOf("day").toISOString(),
};
