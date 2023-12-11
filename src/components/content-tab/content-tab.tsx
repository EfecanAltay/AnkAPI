import * as React from "react";
import { Box, IconButton, ThemeProvider, createTheme, useTheme } from "@mui/material";
import {
  ContentTabItem,
  ContentTabItemMeta,
  ContentTabMeta,
} from "@/common/content-tab-meta";
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
import { useReducer } from "react";

export default function AnkAPIContentTab(contentTabMeta: ContentTabMeta) {
  const theme = useTheme();
  const [selectedContentKey, setSelectedContentKey] = React.useState("");
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [items, setItems] = React.useState<ContentTabItem[]>(prepareTabList(contentTabMeta.contentTabList));


  //** Opened Content Pages **/
  
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

  function AddTab(item?: ContentTabItem){
    let tabItem = new ContentTabItem();
    tabItem.Id = crypto.randomUUID();
    
    if(items.length > 0 )
    {
      let counter = 0;
      do
      {
        let f_item = items.find(x=> x.ContentName === `New Page ${counter > 0 ? counter : ''}`);
        if(f_item)
        {          
          counter = counter + 1;
        }
        else
          break;
      }while(true);
      tabItem.ContentName = `New Page ${counter}`
    }
    else
      tabItem.ContentName = "New Page "

    
    items.push(tabItem);
    setItems(items);
    forceUpdate();
  }

  function RemoveTab(id: UniqueIdentifier){
    setItems(items.filter(i=> i.Id !== id));
    forceUpdate();
  }

  //**************************/
  
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const getItemIndexList = (contentTablist?: ContentTabItem[]) =>
    contentTablist ? contentTablist.map((ct) => ct.Id) : [];
  const getIndex = (item?: ContentTabItem) =>
    items && item ? items.indexOf(item) : -1;
  const getPosition = (item: ContentTabItem) => getIndex(item) + 1;
  const getItem = (id: UniqueIdentifier) =>
    items?.find((item) => item.Id === id);

  const getIndexById = (id: UniqueIdentifier) => getIndex(getItem(id));

  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  function selectContentPage(contentTabItem: ContentTabItem) {
    items.forEach((contentPage) => {
      contentPage.IsSelected = contentPage.ContentKey === contentTabItem.ContentKey;
      contentPage.Referance?.current?.UpdateAction();
    });
  }

  function reorderContentTabs(
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) {
    //console.log(getItemIndexList(items));
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
                  CloseAction={(id)=>RemoveTab(id)}
                />
              ))}
            </SortableContext>
            <DragOverlay dropAnimation={null}></DragOverlay>
          </DndContext>
          <IconButton onClick={()=>{ AddTab()}} aria-label="fingerprint">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </ThemeProvider>
    </Box>
  );
}
