import { Box, CssBaseline } from "@mui/material";
import React from "react";

import MainContent from "@/components/content";
import Drawer from "@/components/drawer";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <CssBaseline />
      <Drawer />
      <MainContent>{children}</MainContent>
    </Box>
  );
};

export default AdminLayout;
