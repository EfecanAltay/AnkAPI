import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ThemeProvider,
  Tooltip,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
import { SidebarMeta } from "@/common/sidebar-meta";
import { MenuItemData } from "@/common/menu-item";
import "./ankapi-sidebar.css";
import { ArrowRight, Home, Person, Settings } from "@mui/icons-material";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "&":{
    width:"100px"
  },
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    width:"100%"
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function AnkAPISideBar(sidebarMeta: SidebarMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = React.useState("");

  function onClickMenuItem(menuItemMeta: MenuItemData) {
    setSelecteMenuKey(menuItemMeta.MenuKey);
    sidebarMeta.OnChangedSelectedMenu?.(menuItemMeta.MenuKey);
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
      <Paper elevation={0} className="sidebar">
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list" sx={{ height: 60 }}>
              <ListItemText
                primary="AnkAPI"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            {renderMenuList(sidebarMeta.MenuListMeta, selecteMenuKey, onClickMenuItem)}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

function renderMenuList(
  menuListMeta: MenuItemData[] | undefined,
  selecteMenuKey: string,
  callbackItem: any
) {
  function renderIcon(menuItem: MenuItemData) {
    if (menuItem?.IconContent) {
      return (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: "center",
          }}
        >
          {menuItem?.IconContent}
        </ListItemIcon>
      );
    }
  }
  return (
    <List>
      {menuListMeta?.map((menuItem: MenuItemData) => (
        <ListItem
          key={menuItem.MenuKey}
          disablePadding
          sx={{
            display: "block",
            backgroundColor:
              selecteMenuKey === menuItem.MenuKey
                ? "var(--mui-palette-selected-menu-item)"
                : "transparent",
          }}
          onClick={() => {
            callbackItem(menuItem);
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
          >
            {renderIcon(menuItem)}
            <ListItemText
              primary={menuItem.Name}
              sx={{ opacity: 1}}
            />
          </ListItemButton>
          <Divider />
        </ListItem>
      ))}
    </List>
  );
}
