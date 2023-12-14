import * as React from "react";
import dynamic from "next/dynamic";
import { IconButton, useTheme } from "@mui/material";
import { ContentTabItemMeta } from "@/common/content-tab-meta";
import "./content-tab.css";
import { useImperativeHandle } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const AnkAPIContentTabItem = React.forwardRef(
  (contentTabItemMeta: ContentTabItemMeta, ref) => {
    const theme = useTheme();
    const [isHover, setIsHover] = React.useState(false);
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: contentTabItemMeta.Data?.Id ? contentTabItemMeta.Data?.Id : -1,
        animateLayoutChanges: () => false,
      });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    useImperativeHandle(ref, () => ({
      UpdateAction() {
        forceUpdate();
      },
    }));

    function OnCloseClick(e: any) {
      e.stopPropagation();
      if (contentTabItemMeta.CloseAction && contentTabItemMeta.Data?.Id)
        contentTabItemMeta.CloseAction(contentTabItemMeta.Data.Id);
    }

    return (
      <li
        ref={setNodeRef}
        className={
          contentTabItemMeta.Data?.IsSelected
            ? "pageBarItemActive"
            : "pageBarItem"
        }
        style={style}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          contentTabItemMeta.Data?.SelectCallbackAction(
            contentTabItemMeta.Data
          );
        }}
        {...attributes}
        {...listeners}
      >

        {contentTabItemMeta.Data?.ContentName}
        {contentTabItemMeta.Data?.IsNotSaved ? (
            ' *'
        ) : null}
        {contentTabItemMeta.Data?.IsSelected || isHover ? (
          <IconButton
            onMouseDown={(e) => {
              e.stopPropagation();
              OnCloseClick(e);
            }}
            className="pageBarCloseButton"
          >
            <HighlightOffIcon />
          </IconButton>
        ) : null}
      </li>
    );
  }
);

AnkAPIContentTabItem.displayName = "AnkAPIContentTabItem";

export default AnkAPIContentTabItem;
