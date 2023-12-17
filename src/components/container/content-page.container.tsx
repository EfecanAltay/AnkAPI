"use client";

import "../components.css";
import "./content-page.container.css";
import * as React from "react";
import { Backdrop, Box, CircularProgress, Theme, useTheme } from "@mui/material";
import { ContentPageContainerMeta } from "@/common/meta/content-container.meta";
import AnkAPIContentTab from "../content-tab/content-tab";
import { ContentTabItem } from "@/common/meta/content-tab-meta";
import ContentMenu from "../menu-list/content-menu";
import { useReducer, useRef } from "react";
import { IContentTab } from "../content-tab/content-tab-interface";
import { ContentMenuItem } from "@/common/data/content-menu/content-menu.data";
import { IContentPage } from "@/common/content-page.interface";

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

export default function ContentPageContainer(cpcm: ContentPageContainerMeta) {
  const theme = useTheme();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [contentSize, setContentSize] = React.useState([0, 0]);
  const [sideBarShowing, setSideBarShowing] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [openedPageList, setOpenedPageList] = React.useState<ContentTabItem[]>([]);
  const [currentData, setCurrentData] = React.useState<any>();
  
  const contentTabRef = useRef<IContentTab| undefined>();
  const pageRef = useRef<IContentPage| undefined>();

  let menuList = cpcm.ContentPageContainerInfo?.ContentMenuList ? cpcm.ContentPageContainerInfo?.ContentMenuList : [];
  
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
    if(item.ContentData){
      contentTabRef.current?.ShowOnContentMenuItem(item);
      setCurrentData(item.ContentData);
      pageRef.current?.Show();
      forceUpdate();
    }
    else{
      console.error("Empty content data !");
    }
    setOpenedPageList(openedPageList);
  }

  const contentMenu = cpcm.ContentPageContainerInfo?.IsHaveContentMenu === true ?
  <div className="leftMenu">
    <ContentMenu key={"leftMenu"} ContentMenuList={menuList} ShowContentAction={ShowContentAction} ></ContentMenu>
  </div> : null;
  const contentTab = cpcm.ContentPageContainerInfo?.IsHaveContentTab === true ?
  <div className="content-tab">
    <AnkAPIContentTab ref={contentTabRef} contentTabList={openedPageList} />
  </div>: null;

  let childElement = <div>Empty</div>
  
  if(cpcm?.children)
    childElement = React.cloneElement(cpcm.children, {
        data : currentData,
        ref : pageRef
    });

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
          {childElement}
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
