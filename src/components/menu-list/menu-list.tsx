import * as React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
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
            primary: { main:  "#082e50" },
            background: { paper: "#082e50" },
          },
        })}>
        <Paper
          elevation={0}
          className="menulist"
          sx={{ borderRadius: 0, maxWidth: 400, backgroundColor:"--mui-palette-primary-light"}}
        >
          <FireNav component="nav" disablePadding dense={false}>
            <ListItemButton key="test" component="a" href="#customized-list">
              <ListItemText
                sx={{ marginLeft: 5 }}
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
  const ref = React.createRef<HTMLDivElement>();
  function OnMouseEnter(){
    ref.current?.style.setProperty("background-color","var(--mui-palette-selected-menu-item-light)");
  }

  function onMouseLeave(){
    ref.current?.style.setProperty("background-color","transparent");
  }

  function onShowingChanged(isShowing: boolean){
    ref.current?.style.setProperty("animation",`${isShowing ? "showChildrenList" : "hideChildrenList" } 0.4s forwards`);
  }

  return  (
  <div>
    <AnkAPIMenuItem OnMouseEnter={OnMouseEnter} OnMouseLeave={onMouseLeave} OnShowingChanged={onShowingChanged} MenuItemData={menuItemData} />
    {
      menuItemData?.Children && menuItemData?.Children?.length > 0 && 
      <div id={menuItemData.MenuKey} ref={ref}  style={{ marginLeft: `25px`}}>
            {
              menuItemData?.Children?.map((child)=>renderMenuItem(child))
            }
      </div>
    }
  </div>
  );
}
