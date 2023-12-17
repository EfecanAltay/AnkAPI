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
import { ContentMenuListMeta } from "@/common/meta/content-menu-list.meta";
import "./menu-list.css";
import { ContentMenuItem, ContentMenuItemType } from "@/common/data/content-menu/content-menu.data";
import {
  DndProvider,
  DropOptions,
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useReducer, useState } from "react";
import { CustomNode } from "./custom-node";
import menuStyle from "./content-menu.module.css";
import { tree } from "next/dist/build/templates/app-page";

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
          Selectable: element.MenuType === ContentMenuItemType.Content,
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
  ) {
    const resultList: ContentMenuItem[] = [];
    menuList.forEach((node) => {
      const parentContentMenuItem = node.data;
      if (parentContentMenuItem) {
        const children = menuList.filter((x) => x.parent === node.id);
        parentContentMenuItem.haveChildren = children && children.length > 0;
        if (parentContentMenuItem && parentContentMenuItem.haveChildren) {
          parentContentMenuItem.Children = children.map(
            (x) => x.data
          ) as ContentMenuItem[];
        }
        if (node.parent === 0) resultList.push(parentContentMenuItem);
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
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const menu = ContentMenuProvider.GetContentMenuConvert(
    contentMenuList.ContentMenuList
  );
  const [treeData, setTreeData] = useState(menu);
  const handleDrop = (newTreeData: NodeModel<ContentMenuItem>[]) => {
    let nList = ContentMenuProvider.GetNodeModelToContentMenu(newTreeData);
    console.log(nList);
    newTreeData = ContentMenuProvider.GetContentMenuConvert(nList);
    setTreeData(newTreeData);
  };

  const canDrop = (treeData: NodeModel<ContentMenuItem>[],options: DropOptions<ContentMenuItem>): boolean | void =>  {
    
    if(options.dropTarget && options.dragSourceId !== options.dropTargetId)
    {
      if(options.dropTarget.parent !== 0 && !dropValidation(options.dragSourceId,options.dropTarget,treeData))
        return false; 
      
      return options.dropTarget.droppable;
    }
    else return false;
  };

  function dropValidation(dragId : any, options: NodeModel<ContentMenuItem>, treeData: NodeModel<ContentMenuItem>[]){
    if(options.parent !== 0)
    {
      if(options.parent === dragId)
        return false;
      const _parent = treeData.find(i=> i.id === options.parent);
      if(_parent)
        return dropValidation(dragId, _parent ,treeData);
      else 
        return false;
    }
    return true;
  }  

  function onSelectedMenuItem(id: string | number) {
    for (let i = 0; i < treeData.length ; i++) {
      let data = treeData[i];
      if (data.id === id && data.data){
        data.data.IsSelected = true;
        treeData[i] = data ;
        setTreeData(treeData);
        forceUpdate();
      }
      else if (data.data){
        data.data.IsSelected = false;
      }
    }
  }

  function onShowedMenu(id: string | number) {
    for (let i = 0; i < treeData.length ; i++) {
      let data = treeData[i];
      if (data.id === id && data.data){
        data.data.IsSelected = true;
        treeData[i] = data ;
        setTreeData(treeData);
        forceUpdate();
        contentMenuList.ShowContentAction?.(data.data);
      }
      else if (data.data){
        data.data.IsSelected = false;
      }
    }
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
                        onSelected={onSelectedMenuItem}
                        onShowed={onShowedMenu}
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