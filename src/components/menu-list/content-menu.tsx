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
import {
  DndProvider,
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useState } from "react";
import { CustomNode } from "./custom-node";
import menuStyle from "./content-menu.module.css";

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

export class ContentMenuProvider {
  public static GetContentMenuConvert(
    menuList: ContentMenuItem[],
    parentId: number | string = 0,
    currentId: number = 1
  ) {
    let resultList: NodeModel<ContentMenuItem>[] = [];
    let itemIdCounter = currentId;
    menuList.forEach((element, index) => {
      const parentItem = {
        id: itemIdCounter,
        parent: parentId,
        text: element.Name,
        droppable: element.MenuType === ContentMenuItemType.Directory,
        data: {
          Name: element.Name,
          MenuKey: element.MenuKey,
          MenuType: element.MenuType,
          haveChildren:
            element.Children && element.Children.length > 0 ? true : false,
        } as ContentMenuItem,
      } as NodeModel<ContentMenuItem>;

      resultList.push(parentItem);
      if (element.Children && element.Children.length > 0) {
        itemIdCounter = itemIdCounter + 1;
        const childrens = this.GetContentMenuConvert(
          element.Children,
          parentItem.id,
          itemIdCounter
        );
        resultList = resultList.concat(childrens);
        itemIdCounter = itemIdCounter + childrens.length;
      } else itemIdCounter = itemIdCounter + 1;
    });
    return resultList;
  }

  public static GetNodeModelToContentMenu(
    menuList: NodeModel<ContentMenuItem>[]
  ){
    const resultList: ContentMenuItem[] = [];
    menuList.forEach((node) => {
      const parentContentMenuItem = node.data;
      if (parentContentMenuItem) {
        const children = menuList.filter((x) => x.parent === node.id);
        parentContentMenuItem.haveChildren = children && children.length > 0;
        if (parentContentMenuItem && parentContentMenuItem.haveChildren) {
          parentContentMenuItem.Children = children.map(x=> x.data) as ContentMenuItem[];
        }
        if(node.parent === 0)
          resultList.push(parentContentMenuItem);
      }
    });
    return resultList;
  }
}

export default function ContentMenu(contentMenuList: ContentMenuListMeta) {
  const theme = useTheme();
  const [selecteMenuKey, setSelecteMenuKey] = useState("");
  const [draggedMenuName, setDraggedMenuName] = useState<
    ContentMenuItem | undefined
  >(undefined);

  const menu = ContentMenuProvider.GetContentMenuConvert(
    contentMenuList.ContentMenuList
  );
  const [treeData, setTreeData] = useState(menu);
  const handleDrop = (newTreeData: NodeModel<ContentMenuItem>[]) => {
    let nList = ContentMenuProvider.GetNodeModelToContentMenu(newTreeData);
    console.log(nList);
    newTreeData = ContentMenuProvider.GetContentMenuConvert(
      nList
    );
    setTreeData(newTreeData);
  };

  const canDrop = (newTreeData: NodeModel<ContentMenuItem>) => {
    return newTreeData.droppable;
  };

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
            {treeData ? (
              <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <div className={menuStyle.app}>
                  <Tree
                    tree={treeData}
                    rootId={0}
                    render={(
                      node: NodeModel<ContentMenuItem>,
                      { depth, isOpen, onToggle }
                    ) => (
                      <CustomNode
                        node={node}
                        depth={depth}
                        isOpen={isOpen}
                        onToggle={onToggle}
                      />
                    )}
                    onDrop={handleDrop}
                    canDrop={canDrop}
                    classes={{
                      root: menuStyle.treeRoot,
                      draggingSource: menuStyle.draggingSource,
                      dropTarget: menuStyle.dropTarget,
                    }}
                  />
                </div>
              </DndProvider>
            ) : null}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );

  function handleDragStart(event: any) {
    setDraggedMenuName(event.active?.data?.current?.content);
  }

  function handleDragEnd(event: any) {
    setDraggedMenuName(undefined);
    const { active, over } = event;

    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      console.log(over);
    }
  }
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
