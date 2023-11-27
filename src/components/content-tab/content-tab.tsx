import * as React from "react";
import { Box, ThemeProvider, createTheme, useTheme } from "@mui/material";
import {
  ContentTabItem,
  ContentTabItemMeta,
  ContentTabMeta,
} from "@/common/content-tab-meta";
import "./content-tab.css";
import AnkAPIContentTabItem from "./content-tab-item";
import { DndContext, DragOverlay, UniqueIdentifier } from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  arrayMove,
  defaultAnimateLayoutChanges,
  SortableContext,
} from "@dnd-kit/sortable";

export default function AnkAPIContentTab(contentTabMeta: ContentTabMeta) {
  const theme = useTheme();
  const [selectedContentKey, setSelectedContentKey] = React.useState("");
  const [items, setItems] = React.useState<ContentTabItem[]>(
    initMockPageList()
  );
  
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

  function initMockPageList() {
    const openedPageList = [];
    const cp = new ContentTabItem();
    cp.PageKey = "TEST0";
    cp.PageName = "TEST 0";
    cp.IsSelected = true;
    cp.SelectCallbackAction = selectContentPage;
    const cp1 = new ContentTabItem();
    cp1.PageKey = "TEST1";
    cp1.PageName = "TEST 1";
    cp1.SelectCallbackAction = selectContentPage;
    const cp2 = new ContentTabItem();
    cp2.PageKey = "TEST2";
    cp2.PageName = "TEST 2";
    cp2.SelectCallbackAction = selectContentPage;
    openedPageList.push(cp);
    openedPageList.push(cp1);
    openedPageList.push(cp2);
    openedPageList.forEach((tabItem, index) => {
      tabItem.Id = index + 1;
    });
    return openedPageList;
  }

  function selectContentPage(contentTabItem: ContentTabItem) {
    items.forEach((contentPage) => {
      contentPage.IsSelected = contentPage.PageKey === contentTabItem.PageKey;
      contentPage.Referance?.current.UpdateAction();
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
        </div>
      </ThemeProvider>
    </Box>
  );
}
