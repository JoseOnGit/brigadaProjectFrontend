import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC, useState } from "react";
import { getHomeRoutePath } from "../routes/routePaths";

type Props = {};

const MainNavigation: FC<Props> = () => {
  console.log("%c⧭ MainNavigation component is rendered.. ", "color: #00bf00");

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsNavOpen(isOpen);
    };

  return (
    <React.Fragment key={"MainNavigation"}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 2 }}
        onClick={toggleDrawer(true)}
      >
        <div>M</div>
      </IconButton>
      <Drawer anchor={"right"} open={isNavOpen} onClose={toggleDrawer(false)}>
        <List>
          {["Home", "Profile", "Calendar", "About"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={getHomeRoutePath()}>
                <ListItemIcon>{index % 2 === 0 ? "In" : "@"}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export { MainNavigation };
