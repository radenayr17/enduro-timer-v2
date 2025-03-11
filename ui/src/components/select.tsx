import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  onChange?: (event: SelectChangeEvent) => void;
  value?: string;
  label?: string;
  options?: { label: string; value: string }[];
  error?: boolean;
  size?: "small" | "medium";
}

export default function BasicSelect({
  label = "",
  value = "",
  options = [],
  onChange = () => {},
  error = false,
  size = "medium",
}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange} error={error} size={size}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
