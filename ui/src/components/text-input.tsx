import { TextField, TextFieldVariants, TextFieldProps } from "@mui/material";

const TextInput = (props: TextFieldProps) => {
  const { variant = "outlined", ...rest } = props;
  return <TextField variant={variant} {...rest} />;
};

export default TextInput;
