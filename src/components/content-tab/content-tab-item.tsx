import * as React from "react";
import { useTheme } from "@mui/material";
import { ContentTabItemMeta } from "@/common/content-tab-meta";
import "./content-tab.css";
import { useImperativeHandle } from "react";
import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const AnkAPIContentTabItem = React.forwardRef(
  (contentTabItemMeta: ContentTabItemMeta, ref) => {
    const theme = useTheme();
    const [isHover, setIsHover] = React.useState(false);
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: contentTabItemMeta.Data?.Id ? contentTabItemMeta.Data?.Id : -1, 
        animateLayoutChanges : ()=> false });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    useImperativeHandle(ref, () => ({
      UpdateAction() {
        forceUpdate();
      },
    }));

    return (
      <li
        ref={setNodeRef}
        className={
          contentTabItemMeta.Data?.IsSelected
            ? "pageBarItemActive"
            : "pageBarItem"
        }
        style={style}
        onMouseEnter={()=>{
          setIsHover(true);
        }}
        onMouseLeave={()=>{
          setIsHover(false);
        }}
        onMouseDown={() => {
          contentTabItemMeta.Data?.SelectCallbackAction(
            contentTabItemMeta.Data
          );
        }}
        {...attributes}
        {...listeners}
      >
        {contentTabItemMeta.Data?.PageName}
        {contentTabItemMeta.Data?.IsSelected || isHover ? (
          <button className="pageBarCloseButton">X</button>
        ) : null}
      </li>
    );
  }
);

AnkAPIContentTabItem.displayName = "AnkAPIContentTabItem";

export default AnkAPIContentTabItem;
