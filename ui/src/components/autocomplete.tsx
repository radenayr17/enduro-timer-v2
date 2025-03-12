import { Autocomplete } from "@mui/material";

import TextInput from "./text-input";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options?: Option[];
  size?: "small" | "medium";
  onChange?: (value: string) => void;
  value?: string;
  disableClearable?: boolean;
}

const AutoComplete = ({ size = "medium", options = [], onChange = () => {}, ...props }: Props) => {
  const handleChange = (_, value: Option) => onChange(value?.value ?? "");

  const value = options.find((option) => option.value === props.value);

  return (
    <Autocomplete
      {...props}
      value={value}
      options={options}
      onChange={handleChange}
      renderInput={(params) => <TextInput {...params} size={size} />}
    />
  );
};

export default AutoComplete;
