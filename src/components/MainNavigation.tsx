import React, { FC, Fragment, ReactNode, useMemo, useState } from "react";
import {
  getCalendarRoutePath,
  getDashboardRoutePath,
  getLoginRoutePath,
  getProfileRoutePath,
} from "../routes/routePaths";
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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { ROLE } from "../constants/commonConstants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userSelector } from "../slices/user";
import { useNavigate } from "react-router-dom";
import { removeOnLogout } from "../slices/user";

const menuItemColor = "#ffffff";
const menuBackgroundColor = "#1976d2";

type MenuItemType = {
  label: string;
  route: string;
  icon: ReactNode;
  permission: string[];
  bottom?: boolean;
  logout?: boolean;
  onClickHandler?: () => void;
};

const MENU_ITEMS: MenuItemType[] = [
  {
    icon: <HomeIcon />,
    label: TXT.mainNavigation.home,
    route: getDashboardRoutePath(),
    permission: [],
  },
  {
    icon: <PersonIcon />,
    label: TXT.mainNavigation.profile,
    route: getProfileRoutePath(),
    permission: [ROLE.USER, ROLE.MODERATOR],
  },
  {
    icon: <PeopleAltIcon />,
    label: TXT.mainNavigation.employees,
    route: "",
    permission: [ROLE.MODERATOR, ROLE.ADMIN],
  },
  {
    icon: <CalendarMonthIcon />,
    label: TXT.mainNavigation.calendar,
    route: getCalendarRoutePath(),
    permission: [ROLE.USER, ROLE.MODERATOR, ROLE.ADMIN],
  },
  {
    icon: <HelpOutlineIcon />,
    label: TXT.mainNavigation.help,
    route: getDashboardRoutePath(),
    permission: [],
  },
  {
    icon: <InfoIcon />,
    label: TXT.mainNavigation.about,
    route: getDashboardRoutePath(),
    permission: [],
  },
  {
    icon: <LogoutIcon />,
    label: TXT.mainNavigation.logout,
    route: getLoginRoutePath(),
    permission: [ROLE.USER, ROLE.MODERATOR, ROLE.ADMIN],
    logout: true,
    bottom: true,
  },
];

const MainNavigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(userSelector);

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

  const renderMenuItem = (menuItem: MenuItemType, isBottom?: boolean) => {
    const border = isBottom
      ? { borderTop: `1px solid ${menuItemColor}45` }
      : { borderBottom: `1px solid ${menuItemColor}45` };

    const hasPermission = currentUser?.roles?.some((role: string) =>
      menuItem.permission.includes(role)
    );

    return (
      (hasPermission || !menuItem.permission.length) && (
        <ListItem key={menuItem.label} disablePadding>
          <ListItemButton
            sx={{
              padding: "1.5rem",
              ...border,
            }}
            onClick={() => {
              if (menuItem.logout) {
                dispatch(removeOnLogout());
              }
              setIsNavOpen(false);
              navigate(menuItem.route);
            }}
          >
            <ListItemIcon sx={{ color: menuItemColor }}>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItemButton>
        </ListItem>
      )
    );
  };

  const menuItemsTop = useMemo(() => {
    return MENU_ITEMS.filter((menuItem) => !menuItem.bottom).map((menuItem) =>
      renderMenuItem(menuItem)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MENU_ITEMS, currentUser]);

  const menuItemsBottom = useMemo(() => {
    return MENU_ITEMS.filter((menuItem) => menuItem.bottom).map((menuItem) =>
      renderMenuItem(menuItem, true)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MENU_ITEMS, currentUser]);

  return (
    <Fragment key={"MainNavigation"}>
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
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "0rem",
          }}
        >
          <div>{menuItemsTop}</div>
          <div>{menuItemsBottom}</div>
        </List>
      </Drawer>
    </Fragment>
  );
};

export { MainNavigation };
