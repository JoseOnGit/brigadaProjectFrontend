import React, { FC, useState } from "react";
import { getHomeRoutePath } from "../routes/routePaths";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TXT from "../contexts/texts.json";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";

const menuItemColor = "#ffffff";
const menuBackgroundColor = "#1976d2";

const menuItems = [
  {
    label: TXT.mainNavigation.home,
    route: getHomeRoutePath(),
    icon: <HomeIcon />,
  },
  {
    label: TXT.mainNavigation.profile,
    route: getHomeRoutePath(),
    icon: <PersonIcon />,
  },
  {
    label: TXT.mainNavigation.calendar,
    route: getHomeRoutePath(),
    icon: <CalendarMonthIcon />,
  },
  {
    label: TXT.mainNavigation.help,
    route: getHomeRoutePath(),
    icon: <HelpOutlineIcon />,
  },
  {
    label: TXT.mainNavigation.about,
    route: getHomeRoutePath(),
    icon: <InfoIcon />,
  },
];

const MainNavigation: FC = () => {
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
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={isNavOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "50%",
            backgroundColor: menuBackgroundColor,
            color: menuItemColor,
          },
        }}
      >
        <List>
          {menuItems.map((menuItem) => (
            <ListItem key={menuItem.label} disablePadding>
              <ListItemButton
                href={menuItem.route}
                sx={{
                  padding: "1.5rem",
                  borderBottom: `1px solid ${menuItemColor}45`,
                }}
              >
                <ListItemIcon sx={{ color: menuItemColor }}>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export { MainNavigation };
