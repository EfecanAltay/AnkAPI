import * as React from "react";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MenuItemMeta } from "@/common/menu-item-meta";
import { MenuItemData } from "@/common/menu-item";
import "./menu-item.css";

export default function AnkAPIMenuItem(menuItemMeta: MenuItemMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = React.useState("");

  return (
    <ListItem
      disablePadding
      className="menuItem"
      key={menuItemMeta.MenuItemData?.MenuKey}
      sx={{
        paddingLeft: `calc(${menuItemMeta.MenuItemData.ParentIndex * 25}px + ${menuItemMeta.MenuItemData.Children ? 0 : 20}px)`
      }}
      onClick={() => {
        clickItem(menuItemMeta.MenuItemData);
      }}>
      {
        menuItemMeta.MenuItemData.Children ? 
        (
          <ListItemIcon style={{ cursor: "pointer", margin: "0" }}>
            <ChevronRightIcon />
          </ListItemIcon>
        ) : (
          <ListItemIcon style={{ cursor: "pointer", margin: "0" }}>
           
          </ListItemIcon>
        )
      }
      <ListItemText style={{ cursor: "pointer"}}>
        {menuItemMeta.MenuItemData?.Name}
      </ListItemText>
    </ListItem>
  );
}

function renderIcon(menuItem: MenuItemData | undefined) {
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

function clickItem(menuItem: MenuItemData | undefined) {}
