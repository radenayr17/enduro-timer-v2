import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

import { DRAWER_WITH, APP_BAR_TEXT } from "@/constants";

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
      {children}
    </Box>
  );
};

export default Content;
