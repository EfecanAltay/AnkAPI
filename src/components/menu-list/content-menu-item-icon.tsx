import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { ContentMenuItemType } from "@/common/data/content-menu/content-menu.data";

export const ContentMenuItemIcon = (props : { menuType? : ContentMenuItemType}) => {
  if(props.menuType === undefined) return null;

  switch (props.menuType) {
    case ContentMenuItemType.Directory:
      return <FolderIcon />;
    case ContentMenuItemType.Content:
      return <ListAltIcon />;
    default:
      return null;
  }
};