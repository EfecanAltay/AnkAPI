import * as React from "react";
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
  console.log(menuItemMeta.MenuItemData?.MenuKey);
  return (
    <ListItem
      disablePadding
      className="menuItem"
      key={menuItemMeta.MenuItemData?.MenuKey}
      onMouseEnter={()=>menuItemMeta?.OnMouseEnter?.()}
      onMouseLeave={()=>menuItemMeta?.OnMouseLeave?.()}
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
          <ListItemIcon style={{ cursor: "pointer", marginLeft: "10px" }}>
           
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
