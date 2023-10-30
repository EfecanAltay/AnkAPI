import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  CSSObject,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Theme,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import { SidebarMeta } from "@/common/sidebar-meta";
import { MenuItemMeta } from "@/common/menu-item-meta";
import { MenuListMeta } from "@/common/menu-list";
import { ArrowRight, Home, Settings } from "@mui/icons-material";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;


const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function AnkAPIMenuList(sidebarMeta: MenuListMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = React.useState("");

  function onClickMenuItem(menuItemMeta: MenuItemMeta) {
    setSelecteMenuKey(menuItemMeta.MenuKey);
    sidebarMeta.OnChangedSelectedMenu?.(menuItemMeta.MenuKey);
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Paper elevation={0} sx={{ maxWidth: 256, height:400 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Firebash"
                primaryTypographyProps={{
                  fontSize: 20,
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
  menuListMeta : MenuItemMeta[] | undefined,
  selecteMenuKey: string,
  callbackItem: any
) {
  function renderIcon(menuItem: MenuItemMeta) {
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
      {menuListMeta?.map((menuItem: MenuItemMeta) => (
        <ListItem
          className="menuItem"
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
        </ListItem>
      ))}
    </List>
  );
}
