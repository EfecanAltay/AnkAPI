import * as React from "react";
import { Box, IconButton, ThemeProvider, createTheme, useTheme } from "@mui/material";
import {
  ContentTabMeta,
} from "@/common/meta/content-tab-meta";
import "./content-tab.css";
import AnkAPIContentTabItem from "./content-tab-item";
import { DndContext, DragOverlay, UniqueIdentifier } from "@dnd-kit/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  AnimateLayoutChanges,
  arrayMove,
  defaultAnimateLayoutChanges,
  SortableContext,
} from "@dnd-kit/sortable";
import { forwardRef, useImperativeHandle, useReducer, useState } from "react";
import { IContentTab } from "./content-tab-interface";
import { ContentMenuItem } from "@/common/data/content-menu/content-menu.data";
import { ContentTabItem } from "@/common/data/content-tab/content-tab-item.data";

const ContentTab = forwardRef<IContentTab | undefined,ContentTabMeta>((props,ref) => AnkAPIContentTab(props,ref));
ContentTab.displayName = 'ContantTab';
export default ContentTab;

function AnkAPIContentTab(contentTabMeta: ContentTabMeta, ref: React.ForwardedRef<IContentTab | undefined>) {
  const theme = useTheme();
  const [selectedContentKey, setSelectedContentKey] = useState("");
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [items, setItems] = useState<ContentTabItem[]>(prepareTabList(contentTabMeta.contentTabList));

  useImperativeHandle(ref, () => (
    {
      ShowOnContentMenuItem(item) {
        const f_contentTab = findContentMenu(item.MenuKey);
        if(f_contentTab)
        {
          selectContentPage(f_contentTab);
          forceUpdate();
        }
        else
        {
          addNewTab(item);
        } 
      }
    }
  ));
  
  //** Opened Content Pages **/
  
  function findContentMenu(ContentKey : string) {
    return items.find(x=> x.ContentKey === ContentKey );
  }
  
  function prepareTabList(items : ContentTabItem[] | undefined) {
    if(items && items.length > 0){
      items.forEach((tabItem, index) => {
        tabItem.SelectCallbackAction = selectContentPage;
        tabItem.Id = index + 1;
      });
      return items;
    }
    return [];   
  }

  function addNewTab(menuItem?: ContentMenuItem){
    let tabItem = new ContentTabItem();
    tabItem.SelectCallbackAction = selectContentPage;
    tabItem.IsSelected = true;

    if(menuItem)
    {
      tabItem.ContentKey = menuItem.MenuKey;
      tabItem.ContentName = menuItem.Name;
      tabItem.IsNotSaved = false;
    }
    else
    {
      /* Creating New Tab */
      if(items.length > 0 )
      {
        let counter = 0;
        do
        {
          let f_item = items.find(x=> x.ContentName === `New Page${counter > 0 ? ' ' + counter : ''}`);
          if(f_item)
          {          
            counter = counter + 1;
          }
          else
            break;
        }while(true);
        tabItem.ContentName = `New Page${counter > 0 ? ' ' + counter : ''}`
      }
      else
        tabItem.ContentName = "New Page"
     
      tabItem.ContentKey = tabItem.ContentName.replace(/\s/g, '').trim().toUpperCase();
    }
    
    items.push(tabItem);

    setItems(prepareTabList(items));
    selectContentPage(tabItem);
    forceUpdate();
  }

  function RemoveTab(id: UniqueIdentifier){
    const r_item = items.find(x => x.Id === id && x.IsSelected);
    const n_items = items.filter(i=> i.Id !== id);
    setItems(n_items);
    if(r_item && n_items.length > 0)
    {
      n_items[n_items.length-1].IsSelected = true;
    }
    //forceUpdate();
  }

  //**************************/
  
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const getItemIndexList = (contentTablist?: ContentTabItem[]) =>
    contentTablist ? contentTablist.map((ct) => ct.Id) : [];
  const getIndex = (item?: ContentTabItem) =>
    items && item ? items.indexOf(item) : -1;

  const getItem = (id: UniqueIdentifier) =>
    items?.find((item) => item.Id === id);

  const getIndexById = (id: UniqueIdentifier) => getIndex(getItem(id));

  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  function selectContentPage(contentTabItem: ContentTabItem) {
    items.forEach((contentPage) => {
      contentPage.IsSelected = contentPage.ContentKey === contentTabItem.ContentKey;
      //contentPage.Referance?.current?.UpdateAction();
    });
  }

  function reorderContentTabs(
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) {
    const sortedIndexList = arrayMove(
      items ? getItemIndexList(items) : [],
      getIndexById(activeId),
      getIndexById(overId)
    );
    const resultList: ContentTabItem[] = [];
    sortedIndexList.forEach((index) => {
      const item = getItem(index);
      if (item) resultList.push(item);
    });
    setItems(resultList);
    // console.log(activeId + ' --> ' + overId);
    // console.log(sortedIndexList);
  }

  return (
    <Box
      sx={{ width: "100%", margin: 0, padding: 0, backgroundColor: "#082e50" }}
    >
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
        <div className="pageBarList">
          <DndContext
            id = {React.useId()}
            onDragStart={({ active }) => {
              if (!active) {
                return;
              }
              setActiveId(active.id);
            }}
            onDragEnd={({ over }) => {
              setActiveId(null);
              if (over) {
                const overId = over.id;
                const _activeId = activeId ? activeId : -1;
                if (_activeId !== overId) {
                  reorderContentTabs(_activeId, overId);
                }
              }
            }}
            onDragCancel={() => setActiveId(null)}
          >
            <SortableContext items={getItemIndexList(items)}>
              {items?.map((pageBar, index) => (
                <AnkAPIContentTabItem
                  ref={pageBar.Referance}
                  UpdateAction={pageBar.UpdateAction}
                  key={index + 1}
                  Data={pageBar}
                  CloseAction={(id : any)=>RemoveTab(id)}
                />
              ))}
            </SortableContext>
            <DragOverlay dropAnimation={null}></DragOverlay>
          </DndContext>
          <IconButton onClick={()=>{ addNewTab()}} aria-label="fingerprint">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </ThemeProvider>
    </Box>
  );
}
