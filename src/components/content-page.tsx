"use client";

import "./components.css";
import "./content-page.css";
import * as React from "react";
import { Box, Theme, useTheme } from "@mui/material";
import { ContentMeta } from "@/common/content-meta";
import AnkAPIMenuList from "./menu-list/menu-list";
import { MenuItemData } from "@/common/menu-item";

function getContentWidth(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerWidth - Number.parseInt(theme.spacing(10)) - 1;
  else return 100;
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
  
  const menuList = prepareMenuData(mockMenuListData as MenuItemData[])

  console.log(menuList);
  React.useEffect(() => {
    function sidebarOpenAction(customEvent: any) {
      setSideBarShowing(customEvent.detail);
      setContentSize([
        getContentWidth(window, theme) - 120,
        getContentHeight(window, theme),
      ]);
      console.log(customEvent.detail);
    }
    window.addEventListener("sidebar-open-action", sidebarOpenAction);
  }, [theme]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setContentSize([
        getContentWidth(window, theme) - 120,
        getContentHeight(window, theme),
      ]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [theme, sideBarShowing]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "translate",
        flexGrow: "initial",
        mt: 8,
        minWidth: contentSize[0],
        width:20,
        height: contentSize[1],
      }}>
      <div className="container">
        <div className="leftMenu">
          <AnkAPIMenuList MenuItemList={menuList} ></AnkAPIMenuList>
        </div>
        <div className="content">
          {contentMeta?.children}
        </div>  
      </div>
    </Box>
  );
}
