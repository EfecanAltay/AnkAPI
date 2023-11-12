import * as React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
import { MenuListMeta } from "@/common/menu-list";
import "./menu-list.css";
import AnkAPIMenuItem from "./menu-item/menu-item";
import { MenuItemMeta } from "@/common/menu-item-meta";
import { MenuItemData } from "@/common/menu-item";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "&": {
    borderRadius: 0,
    margin:0,
    width:220
  },
  "& .MuiListItemButton-root": {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 10,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function AnkAPIMenuList(menuList: MenuListMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = React.useState("");

  function onClickMenuItem(menuItemMeta: MenuItemMeta) {
    //setSelecteMenuKey(menuItemMeta?.MenuItemData?.MenuKey);
    //menuList.OnChangedSelectedMenu?.(menuItemMeta?.MenuItemData?.MenuKey);
  }

  return (
    <Box sx={{ display: "flex" }}>
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
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper
          elevation={0}
          className="menulist"
          sx={{ borderRadius: 0, maxWidth: 400, backgroundColor:"--mui-palette-primary-light"}}
        >
          <FireNav component="nav" disablePadding dense={false}>
            <ListItemButton component="a" href="#customized-list">
              <ListItemText
                sx={{ my: 0 }}
                primary="Menu Header"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            {renderMenuList(
              menuList.MenuItemList,
              selecteMenuKey,
              onClickMenuItem
            )}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

function renderMenuList(
  menuListMeta: MenuItemData[],
  selecteMenuKey: string,
  callbackItem: any
) {
  return (
    <List>
    {
      menuListMeta?.map((menuItem: MenuItemData) => (
        renderMenuItem(menuItem)
      ))
    }
    </List>
  );
}

function renderMenuItem(
  menuItemData: MenuItemData
) {
  return  (
  <span>
    <AnkAPIMenuItem MenuItemData={menuItemData}  />
    {
       menuItemData?.Children?.map((child)=>renderMenuItem(child))
    }
  </span>
  );
}
