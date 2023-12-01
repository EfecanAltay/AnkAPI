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
import { ContentMenuListMeta } from "@/common/menu-list";
import "./menu-list.css";
import AnkAPIMenuItem from "./menu-item/menu-item";
import { ContentMenuItem, ContentMenuItemType } from "@/common/content-meta";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "&": {
    borderRadius: 0,
    margin: 0,
    width: 220,
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

export default function AnkAPIMenuList(contentMenuList: ContentMenuListMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = React.useState("");

  function onClickMenuItem(menuItemData: ContentMenuItem) {
    if (menuItemData && menuItemData.MenuType === ContentMenuItemType.Content)
     contentMenuList.ShowContentAction?.(menuItemData);
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
            primary: { main: "#082e50" },
            background: { paper: "#082e50" },
          },
        })}
      >
        <Paper
          elevation={0}
          className="menulist"
          sx={{
            borderRadius: 0,
            maxWidth: 400,
            backgroundColor: "--mui-palette-primary-light",
          }}
        >
          <FireNav component="nav" disablePadding dense={false}>
            <ListItemButton key="test99" component="a" href="#customized-list">
              <ListItemText
                key="test98"
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
            {contentMenuList.MenuItemList
              ? renderMenuList(
                contentMenuList.MenuItemList,
                  selecteMenuKey,
                  onClickMenuItem
                )
              : null}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

function renderMenuList(
  menuListMeta: ContentMenuItem[],
  selecteMenuKey: string,
  callbackClickItem: (item: ContentMenuItem) => void
) {
  return (
    <List>
      {menuListMeta?.map((menuItem: ContentMenuItem) =>
        renderMenuItem(menuItem, callbackClickItem)
      )}
    </List>
  );
}

function renderMenuItem(
  menuItemData: ContentMenuItem,
  callbackClickItem: (item: ContentMenuItem) => void
) {
  const ref = React.createRef<HTMLDivElement>();
  function OnMouseEnter() {
    ref.current?.style.setProperty(
      "background-color",
      "var(--mui-palette-selected-menu-item-light)"
    );
  }

  function onMouseLeave() {
    ref.current?.style.setProperty("background-color", "transparent");
  }

  function onShowingChanged(isShowing: boolean) {
    ref.current?.style.setProperty(
      "animation",
      `${isShowing ? "showChildrenList" : "hideChildrenList"} 0.4s forwards`
    );
  }

  return (
    <div>
      <AnkAPIMenuItem
        key={menuItemData.MenuKey}
        OnMouseEnter={OnMouseEnter}
        OnMouseLeave={onMouseLeave}
        OnShowingChanged={onShowingChanged}
        OnClick={callbackClickItem}
        MenuItemData={menuItemData}
      />
      {menuItemData?.Children && menuItemData?.Children?.length > 0 && (
        <div
          id={menuItemData.MenuKey + "_children"}
          ref={ref}
          style={{ marginLeft: `25px` }}
        >
          {menuItemData?.Children?.map((child) =>
            renderMenuItem(child, callbackClickItem)
          )}
        </div>
      )}
    </div>
  );
}
