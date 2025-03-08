import { Drawer, ListItemText, MenuItem, MenuList, Toolbar } from "@mui/material";
import Link from "next/link";

import { MENU_ITEMS, DRAWER_WITH } from "@/constants";

const SideDrawer = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WITH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: DRAWER_WITH, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <MenuList>
        {MENU_ITEMS.map(({ text, path }, key) => {
          return (
            <MenuItem component={Link} href={path} key={key}>
              <ListItemText>{text}</ListItemText>
            </MenuItem>
          );
        })}
      </MenuList>
    </Drawer>
  );
};

export default SideDrawer;
