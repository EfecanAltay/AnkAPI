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

export default function AnkAPIContentTab(contentTabMeta: ContentTabMeta) {
  const theme = useTheme();
  const [selectedContentKey, setSelectedContentKey] = React.useState("");
  const [items, setItems] = React.useState<ContentTabItem[]>(getOpenedContentPages());

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

  function getOpenedContentPages(){
    const openedPages : ContentTabItem[] = [];
    // TODO : Load from Cache
    // const p0 = new ContentTabItem();
    // p0.ContentName = "TEST 0";
    // p0.ContentKey = "TEST0";
    // p0.IsSelected = true;
    // openedPages.push(p0);
    // const p1 = new ContentTabItem();
    // p1.ContentName = "TEST 1";
    // p1.ContentKey = "TEST1";
    // openedPages.push(p1);
    return prepareTabList(openedPages);
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
                />
              ))}
            </SortableContext>
            <DragOverlay dropAnimation={null}></DragOverlay>
          </DndContext>
          <IconButton aria-label="fingerprint">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </ThemeProvider>
    </Box>
  );
}
