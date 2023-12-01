"use client";

import "./components.css";
import "./content-page.css";
import * as React from "react";
import { Backdrop, Box, CircularProgress, Theme, useTheme } from "@mui/material";
import { ContentMenuItem, ContentMeta } from "@/common/content-meta";
import AnkAPIMenuList from "./menu-list/menu-list";
import { MenuItemData } from "@/common/menu-item";
import AnkAPIContentTab from "./content-tab/content-tab";
import { ContentTabItem } from "@/common/content-tab-meta";
import { ContentHeader } from "./content-header/content-header";
import { MenuItemMeta } from "@/common/menu-item-meta";

function getContentWidth(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerWidth - Number.parseInt(theme.spacing(10))-20;
  else return 100;
}
function getContentHeight(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerHeight - Number.parseInt(theme.spacing(8))-40;
  else return 80;
}

function prepareMenuData(menuItemDataList : ContentMenuItem[]){
  menuItemDataList.forEach(menuItemData=>{
    if(!menuItemData.ParentIndex)
    menuItemData.ParentIndex = 0;
    if(menuItemData.Children && menuItemData.Children.length > 0)
    {
      menuItemData.Children.forEach(child=>{
        child.Parent = menuItemData;
        child.ParentIndex = menuItemData.ParentIndex + 1 ;

        if(child.Children)
          prepareMenuData(menuItemData.Children as ContentMenuItem[]);
      });
    }
  });
  return menuItemDataList;
}

let openedPageList : ContentTabItem[] = [];

export default function UIBaseContentPage(contentMeta: ContentMeta) {
  const theme = useTheme();
  const [contentSize, setContentSize] = React.useState([0, 0]);
  const [sideBarShowing, setSideBarShowing] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  let menuList = contentMeta.ContentHeaderInfo?.ContentMenuList;
  if(menuList && menuList.length > 0)
    menuList = prepareMenuData(contentMeta.ContentHeaderInfo?.ContentMenuList as ContentMenuItem[]);

  React.useEffect(() => {
    function sidebarOpenAction(customEvent: any) {
      
      setSideBarShowing(customEvent.detail);
      setContentSize([
        getContentWidth(window, theme),
        getContentHeight(window, theme),
      ]);
    }
    window.addEventListener("sidebar-open-action", sidebarOpenAction);
  }, [theme]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setContentSize([
        getContentWidth(window, theme),
        getContentHeight(window, theme),
      ]);
      //console.log(contentSize);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [theme, sideBarShowing]);

  function ShowContentAction(item:ContentMenuItem): void {
    console.log(item);
  }

  const contentMenu = contentMeta.ContentHeaderInfo?.IsHaveContentMenu === true ?
  <div className="leftMenu">
    <AnkAPIMenuList key={"leftMenu"} MenuItemList={menuList} ShowContentAction={ShowContentAction} ></AnkAPIMenuList>
  </div> : null;
  const contentTab = contentMeta.ContentHeaderInfo?.IsHaveContentTab === true ?
  <div className="content-tab">
    <AnkAPIContentTab SelectedContentKey={"TEST1"} />
  </div>: null;

  return (
    <Box
      sx={{
        backgroundColor: "bisque",
        mt: 8,
        width: contentSize[0],
        padding:0,
        maxHeight: "calc(100%) - 30px",
      }} >
      <div className="container" style={{ minWidth:contentSize[0]}}>
        {contentMenu}
        {contentTab}
        <div className="content">
        {contentMeta?.children}     
        </div>  
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoading}
          onClick={()=>{}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Box>
  );
}
