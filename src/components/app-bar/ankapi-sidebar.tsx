import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import {
  CSSObject,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import { SidebarMeta } from "@/common/sidebar-meta";
import { MenuItemMeta } from "@/common/menu-item-meta";
import "./ankapi-sidebar.css";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

export default function AnkAPISideBar(sidebarMeta: SidebarMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = React.useState("");

  function sidebarSlideButton() {
    sidebarMeta?.OnClickSidebarButton?.();
  }

  function onClickMenuItem(menuItemMeta: MenuItemMeta) {
    setSelecteMenuKey(menuItemMeta.MenuKey);
    sidebarMeta.OnChangedSelectedMenu?.(menuItemMeta.MenuKey);
  }

  return (
    <Drawer variant="permanent" open={sidebarMeta.IsOpen}>
      <DrawerHeader>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AnkAPI
        </Typography>
        {sidebarMeta.IsOpen && (
          <IconButton onClick={sidebarSlideButton}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      {renderMenuList(sidebarMeta, selecteMenuKey, onClickMenuItem)}
    </Drawer>
  );
}

function renderMenuList(
  sidebarData: SidebarMeta,
  selecteMenuKey: string,
  callbackItem: any
) {
  // if(!sidebarData.SelectedMenuKey && sidebarData?.MenuListMeta?.[0].MenuKey)
  // {
  //   setSelecteMenuKey(sidebarData.MenuListMeta[0].MenuKey);
  // }
  // else if(sidebarData.SelectedMenuKey){
  //   setSelecteMenuKey(sidebarData.SelectedMenuKey);
  // }

  function renderIcon(menuItem: MenuItemMeta, isMenuOpen: boolean) {
    if (menuItem?.IconRender) {
      return (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: sidebarData.IsOpen ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {menuItem?.IconRender?.()}
        </ListItemIcon>
      );
    } else if (!isMenuOpen) {
      return (
        <div>
          {menuItem.Name.replace("  ", " ")
            .split(" ")
            .map((x) => x.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 5)}
        </div>
      );
    }
  }

  return (
    <List>
      {sidebarData?.MenuListMeta?.map((menuItem: MenuItemMeta) => (
        <ListItem
          className="menuItem"
          key={menuItem.MenuKey}
          disablePadding
          sx={{
            display: "block",
            backgroundColor: selecteMenuKey === menuItem.MenuKey
              ? "var(--mui-palette-selected-menu-item)"
              : "transparent",
          }}
          onClick={()=> {callbackItem(menuItem)}}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: sidebarData.IsOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            {renderIcon(menuItem, sidebarData.IsOpen)}
            <ListItemText
              primary={menuItem.Name}
              sx={{ opacity: sidebarData.IsOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
