import { Box } from "@mui/material";

interface Props {
  value: string | number;
  index: string | number;
  children: React.ReactNode;
}

const TabPanel = ({ value, index, children }: Props) => {
  return (
    <div role="tab-panel" hidden={value !== index}>
      {value === index && <Box py={2}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
