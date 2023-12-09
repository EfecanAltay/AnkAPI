import * as React from "react";
import { ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MenuItemMeta } from "@/common/menu-item-meta";
import { MenuItemData } from "@/common/menu-item";
import "./menu-item.css";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export default function AnkAPIMenuItem(menuItemMeta: MenuItemMeta) {
  const theme = useTheme();
  const [childrenShowing, setChildrenShowing] = React.useState(false);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: menuItemMeta.MenuItemData ? menuItemMeta.MenuItemData.MenuKey : -1,
    data: {
      type:"type1",
      content : menuItemMeta.MenuItemData
    }
  });

  function RenderDropAreaItem() {
    const { setNodeRef } = useDroppable({
      id: "droppable",
      data: {
        accepts: ["type1"],
      },
    });
    return <div ref={setNodeRef} style={{ backgroundColor: "gray", width:"100%", height:30, position:"absolute", border:"1px solid red" }}></div>;
  }

  return (
    <li ref={setNodeRef} {...attributes} {...listeners}>
      <ListItem
        ref={setNodeRef}
        disablePadding
        className="menuItem"
        key={menuItemMeta.MenuItemData?.MenuKey}
        onMouseEnter={() => menuItemMeta?.OnMouseEnter?.()}
        onMouseLeave={() => menuItemMeta?.OnMouseLeave?.()}
        onClick={() => {
          menuItemMeta.OnClick?.(menuItemMeta.MenuItemData);
          setChildrenShowing(!childrenShowing);
          menuItemMeta.OnShowingChanged?.(childrenShowing);
        }}
      >
       {RenderDropAreaItem()}
        {menuItemMeta.MenuItemData.Children ? (
          <ListItemIcon style={{ cursor: "pointer", margin: "0" }}>
            <ChevronRightIcon
              style={{
                animation: `${
                  childrenShowing ? "showChildrenIcon" : "hideChildrenIcon"
                } 0.4s forwards`,
              }}
            />
          </ListItemIcon>
        ) : (
          <ListItemIcon
            style={{ cursor: "pointer", marginLeft: "10px" }}
          ></ListItemIcon>
        )}
        <ListItemText
          style={{ userSelect: "none", cursor: "pointer", display: "block" }}
        >
          {menuItemMeta.MenuItemData?.Name}
        </ListItemText>
      </ListItem>
    </li>
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
