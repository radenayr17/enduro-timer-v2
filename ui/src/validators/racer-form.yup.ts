import * as Yup from "yup";

export const racerFormSchema = Yup.object({
  firstName: Yup.string().required("Firstname is required."),
  lastName: Yup.string().required("Lastname is required."),
  number: Yup.number().required("Number is required."),
  categoryId: Yup.string().required("Category is required."),
  stages: Yup.array()
    .of(
      Yup.object().shape({
        stageId: Yup.string().required(),
        startDate: Yup.string().required(),
        startTime: Yup.string().required(),
      })
    )
    .required(),
});

export type racerValuesType = Yup.InferType<typeof racerFormSchema>;

export const racerInitialValues: racerValuesType = {
  firstName: "",
  lastName: "",
  number: 0,
  categoryId: "",
  stages: [],
};
