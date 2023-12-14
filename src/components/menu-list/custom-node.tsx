import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ContentMenuItemIcon } from "./content-menu-item-icon";
import styles from "./custom-node.module.css";
import { ContentMenuItem } from "@/common/content-meta";

type Props = {
  node: NodeModel<ContentMenuItem>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onSelected: (id: NodeModel["id"]) => void;
  onShowed: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const { data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const onSelectMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(data?.Selectable){
      props.onSelected(props.node.id);
      props.onShowed(props.node.id);
    }
  };

  return (
    <div
      className={`tree-node ${styles.root} ${data?.Selectable ? styles.selectable:''} ${data?.IsSelected ? styles.selected:''}`}
      style={{ paddingInlineStart: indent}}
      onClick={onSelectMenu}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
      {data?.haveChildren && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <ContentMenuItemIcon menuType={data?.MenuType} />
      </div>
      <div className={styles.labelGridItem}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
