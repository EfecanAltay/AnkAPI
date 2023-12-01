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
  const [childrenShowing, setChildrenShowing] = React.useState(false);

  return (
    <ListItem
      disablePadding
      className="menuItem"
      key={menuItemMeta.MenuItemData?.MenuKey}
      onMouseEnter={()=>menuItemMeta?.OnMouseEnter?.()}
      onMouseLeave={()=>menuItemMeta?.OnMouseLeave?.()}
      onClick={() => {
        menuItemMeta.OnClick?.(menuItemMeta.MenuItemData);
        setChildrenShowing(!childrenShowing);
        menuItemMeta.OnShowingChanged?.(childrenShowing);
      }}>
      {
        menuItemMeta.MenuItemData.Children ? 
        (
          <ListItemIcon style={{ cursor: "pointer", margin: "0" }}>
            <ChevronRightIcon style={{ animation: `${childrenShowing ? 'showChildrenIcon' : 'hideChildrenIcon'} 0.4s forwards`} }/>
          </ListItemIcon>
        ) : (
          <ListItemIcon style={{ cursor: "pointer", marginLeft: "10px" }}>
           
          </ListItemIcon>
        )
      }
      <ListItemText style={{ userSelect:"none", cursor: "pointer", display:"block"}}>
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