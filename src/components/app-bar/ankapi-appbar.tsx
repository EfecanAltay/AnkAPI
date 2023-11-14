import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarMeta } from '@/common/page-meta';
import { Avatar, ThemeProvider, createTheme, styled } from '@mui/material';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 100;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  position: "absolute",
  zIndex: theme.zIndex.drawer,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AnkAPIAppBar(appBarMeta?:AppBarMeta) {
  let menuIcon;

  function menuButonAction(){
    appBarMeta?.OnClickMenuButton?.();
    window.dispatchEvent(
      new CustomEvent("sidebar-open-action", {
        detail: true,
      })
    );
  }
  if (appBarMeta?.IsHaveMenu && !appBarMeta.IsOpen) {
    menuIcon = <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }} >
                  <MenuIcon onClick={menuButonAction}/>
              </IconButton>;
  }

  return (
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
      <AppBar open={appBarMeta?.IsOpen} >
        <Toolbar>
          {menuIcon}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {appBarMeta?.Title}
          </Typography>
          <Button color="inherit">Login</Button>
          <Avatar alt="Efecan Altay" src="/static/images/avatar/1.jpg" />
        </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}