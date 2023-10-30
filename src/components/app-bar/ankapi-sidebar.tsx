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
  Typography,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
import { SidebarMeta } from "@/common/sidebar-meta";
import { MenuItemMeta } from "@/common/menu-item-meta";
import "./ankapi-sidebar.css";
import { ArrowRight, Home, Person, Settings } from "@mui/icons-material";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "&":{
    width:"200px"
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

  function onClickMenuItem(menuItemMeta: MenuItemMeta) {
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
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="AnkAPI"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItem sx={{ height: 60 }}>
                <ListItemIcon>
                  <Person color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Efecan Altay"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItem>
              <Tooltip title="Profile Settings">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            {renderMenuList(sidebarMeta.MenuListMeta, selecteMenuKey, onClickMenuItem)}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

function renderMenuList(
  menuListMeta: MenuItemMeta[] | undefined,
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
          <Divider />
        </ListItem>
      ))}
    </List>
  );
}
