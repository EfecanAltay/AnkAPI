"use client";

import "./components.css";
import "./content-page.css";
import * as React from "react";
import { Backdrop, Box, CircularProgress, Theme, useTheme } from "@mui/material";
import { ContentMeta } from "@/common/content-meta";
import AnkAPIMenuList from "./menu-list/menu-list";
import { MenuItemData } from "@/common/menu-item";

function getContentWidth(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerWidth - Number.parseInt(theme.spacing(10))-20;
  else return 120;
}
function getContentHeight(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerHeight - Number.parseInt(theme.spacing(8));
  else return 100;
}

const mockMenuListData = 
[
  {
    Name : "TEST 0",
    MenuKey : "TEST0",
    Children : 
    [
      {
        Name : "TEST 00",
        MenuKey : "TEST00"
      }
    ]
  },
  {
    Name : "TEST 1",
    MenuKey : "TEST1"
  },
  {
    Name : "TEST 2",
    MenuKey : "TEST2",
    Children : 
    [
      {
        Name : "TEST 20",
        MenuKey : "TEST20",
        Children : 
        [
          {
            Name : "TEST 200",
            MenuKey : "TEST200"
          },
          {
            Name : "TEST 201",
            MenuKey : "TEST201"
          }
        ]
      },
      {
        Name : "TEST 21",
        MenuKey : "TEST21"
      }
    ]
  }
];

function prepareMenuData(menuItemDataList : MenuItemData[]){
  menuItemDataList.forEach(menuItemData=>{
    if(!menuItemData.ParentIndex)
    menuItemData.ParentIndex = 0;
    if(menuItemData.Children && menuItemData.Children.length > 0)
    {
      menuItemData.Children.forEach(child=>{
        child.Parent = menuItemData;
        child.ParentIndex = menuItemData.ParentIndex + 1 ;

        if(child.Children)
          prepareMenuData(menuItemData.Children as MenuItemData[]);
      });
    }
  });
  return menuItemDataList;
}

export default function UIBaseContentPage(contentMeta: ContentMeta) {
  const theme = useTheme();
  const [contentSize, setContentSize] = React.useState([0, 0]);
  const [sideBarShowing, setSideBarShowing] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  
  const menuList = prepareMenuData(mockMenuListData as MenuItemData[])

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
      console.log(contentSize);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [theme, sideBarShowing]);

  return (
    <Box
      sx={{
        backgroundColor: "bisque",
        mt: 8,
        width: contentSize[0],
        padding:0,
        height: "calc(100%) - 10px",
      }} >
      <div className="container" style={{ minWidth:contentSize[0]}}>
        <div className="leftMenu">
          <AnkAPIMenuList MenuItemList={menuList} ></AnkAPIMenuList>
        </div>
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
