"use client";

import "../components.css";
import "./content-page.container.css";
import * as React from "react";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  Link,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { ContentPageContainerMeta } from "@/common/meta/content-container.meta";
import AnkAPIContentTab from "../content-tab/content-tab";
import { ContentTabItem } from "@/common/data/content-tab/content-tab-item.data";
import ContentMenu from "../menu-list/content-menu";
import { useEffect, useReducer, useRef } from "react";
import { IContentTab } from "../content-tab/content-tab-interface";
import { ContentMenuItem } from "@/common/data/content-menu/content-menu.data";
import { IContentPage } from "@/common/content-page.interface";

import { ContentData } from "@/common/data/content.data";
import BreadCrumbs from "../breadcrumbs/breadcrumbs.component";
import { data } from "autoprefixer";
import { ContentPageData } from "@/common/data/content-pages/content-page.data";
import { ContentPageType } from "@/common/data/content-pages/content-page-header.data";
import { CreateAPIPageData } from "@/common/data/content-pages/create-api-page.data";

function getContentWidth(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerWidth - Number.parseInt(theme.spacing(10)) - 20;
  else return 100;
}
function getContentHeight(window: Window, theme: Theme) {
  if (typeof window !== "undefined")
    return window.innerHeight - Number.parseInt(theme.spacing(8)) - 40;
  else return 80;
}

export default function ContentPageContainer(cpcm: ContentPageContainerMeta) {
  const theme = useTheme();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [contentSize, setContentSize] = React.useState([0, 0]);
  const [sideBarShowing, setSideBarShowing] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [openedPageList, setOpenedPageList] = React.useState<ContentTabItem[]>(
    []
  );
  const [currentData, setCurrentData] = React.useState<ContentPageData>();
  const [currentPath, setCurrentPath] = React.useState<string>("");
  const [newContents, setNewContents] = React.useState<ContentPageData[]>([]);

  const contentTabRef = useRef<IContentTab | undefined>();
  const pageRef = useRef<IContentPage | undefined>();

  let menuList = cpcm.ContentPageContainerInfo?.ContentMenuList
    ? cpcm.ContentPageContainerInfo?.ContentMenuList
    : [];

  useEffect(() => {
      console.log('Contents', newContents);
  }, [newContents])

  function findMenu(
    findingArray: ContentMenuItem[],
    key: string
  ): ContentMenuItem | undefined {
    for (let index = 0; index < findingArray.length; index++) {
      const menu = findingArray[index];
      if (menu.MenuKey === key) return menu;
      else if (menu.Children && menu.Children.length > 0) {
        const finding = findMenu(menu.Children, key);
        if (finding) return finding;
      }
    }
    return undefined;
  }

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

  function ShowContentAction(item: ContentMenuItem): void {
    if (item.ContentData) {
      contentTabRef.current?.ShowOnContentMenuItem(item);
      setCurrentData(item.ContentData);
      setCurrentPath(item.Path);
      pageRef.current?.Show();
      forceUpdate();
    } else {
      console.error("Empty content data !");
    }
    setOpenedPageList(openedPageList);
  }

  function OnSelectedChangedTab(item: ContentTabItem, fromMenu: boolean) {
    if(item.IsNotSaved){
      const arr = newContents;
      const findingNewData = arr.find(x=> x.ContentKey === item.ContentKey); 
      if(findingNewData){
        setCurrentData(findingNewData);
        setCurrentPath(findingNewData.ContentPageHeader.PageName);
        pageRef.current?.Show();
        forceUpdate();
      }
      else{
        const n_data = new ContentPageData();
        n_data.ContentKey = item.ContentKey;
        n_data.ContentPageHeader.PageName = item.ContentName;
        NewContentData(n_data);
        forceUpdate();
      }
    }
    else if (!fromMenu) {
      const findingMenuItem = findMenu(menuList, item.ContentKey);
      if (findingMenuItem) {
        setCurrentData(findingMenuItem.ContentData);
        setCurrentPath(findingMenuItem.Path);
        pageRef.current?.Show();
        forceUpdate();
      }
      else {
        console.error("Empty content data !");
      }
    }
  }

  function NewContentData(data : ContentPageData){
      switch(data.ContentPageHeader.ContentPageType)
      {
        case ContentPageType.CreateAPIPage:
          const n_data = new CreateAPIPageData();
          n_data.ContentKey = data.ContentKey;
          const arr = newContents.copyWithin(0,0);
          arr.push(n_data);
          setNewContents(arr);
          setCurrentData(n_data);
          break;
        case ContentPageType.APIListPage:
          throw Error("must add NewContentData for APIListPage!");
        // TODO : add diff page types
      }
      setCurrentPath("New Content *");
      //pageRef.current?.Show();
      //forceUpdate();
  }

  const contentMenu =
    cpcm.ContentPageContainerInfo?.IsHaveContentMenu === true ? (
      <div className="leftMenu">
        <ContentMenu
          key={"leftMenu"}
          ContentMenuList={menuList}
          ShowContentAction={ShowContentAction}
        ></ContentMenu>
      </div>
    ) : null;
  const contentTab =
    cpcm.ContentPageContainerInfo?.IsHaveContentTab === true ? (
      <div className="content-tab">
        <AnkAPIContentTab
          ref={contentTabRef}
          contentTabList={openedPageList}
          onSelectedChanged={OnSelectedChangedTab}
        />
      </div>
    ) : null;

  const contentBreadcrumbs =
    cpcm.ContentPageContainerInfo?.IsHaveContentTab === true ? (
      <div className="content-breadcrumbs">
        <BreadCrumbs path={currentPath} />
      </div>
    ) : null;

  let childElement = <div>Empty</div>;

  if (cpcm?.children)
    childElement = React.cloneElement(cpcm.children, {
      data: currentData,
      ref: pageRef,
    });

  return (
    <Box
      sx={{
        backgroundColor: "bisque",
        mt: 8,
        width: contentSize[0],
        padding: 0,
        maxHeight: "calc(100%) - 30px",
      }}
    >
      <div className="container" style={{ minWidth: contentSize[0] }}>
        {contentMenu}
        {contentTab}
        {contentBreadcrumbs}
        <div className="content">{childElement}</div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Box>
  );
}
