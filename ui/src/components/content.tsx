import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { APP_BAR_TEXT, DRAWER_WITH } from "@/constants";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: `${DRAWER_WITH}px` }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${DRAWER_WITH}px)`, ml: `${DRAWER_WITH}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {APP_BAR_TEXT}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>{children}</Container>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default Content;
