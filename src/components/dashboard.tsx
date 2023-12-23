"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AnkAPIAppBar from "./app-bar/ankapi-appbar";
import { useEffect, useRef } from "react";
import { ISnackbar } from "@/common/snackbar.interface";
import AnkAPISideBar from "./app-bar/ankapi-sidebar";
import ContentPageContainer from "./container/content-page.container";
import UIEmptyContentPage from "./contents/empty-content.page";
import { SidebarItemData } from "@/common/data/sidebar-menu/sidebar-item.data";
import dynamic from "next/dynamic";
import { DashboardMeta } from "@/common/meta/dashboard-meta";
import { MockDataProvider } from "@/mockdatas/mockdata-provider";
import { AuthonticationAPI } from "@/api_services/auth.service";
import { start } from "repl";
import { StartTwoTone } from "@mui/icons-material";
import { get } from "https";

const UICreateAPIPage = dynamic(() => import("./contents/create-api.page"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Dashboard(metaData : DashboardMeta) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = React.useState("CAR");
  const [menuList, setMenuList] = React.useState(MockDataProvider.GetMainMenuData())//metaData.MainMenuList
  const popupRef = useRef<ISnackbar>(null);

  useEffect(() => {
    AuthonticationAPI.Get();
  }, []);

  function OnClickMenuButton(): any {
    setOpen(true);
  }

  function OnClickSideButton() {
    setOpen(false);
  }

  function OnSelectedMenu(selectedMenuKey: string) {
    setSelectedMenuKey(selectedMenuKey);
  }

  function getPage(menuKey: string): SidebarItemData | undefined {
    const contentPage = menuList.find((x) => x.MenuKey === menuKey);
    return contentPage;
  }

  const currentPage = getPage(selectedMenuKey);

  const currentPageRender = currentPage ? (
    <ContentPageContainer ContentPageContainerInfo={currentPage.ContentPageContainerInfo}>
      {currentPage.PageContent}
    </ContentPageContainer>
  ) : (
    <UIEmptyContentPage />
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        backgroundColor: "gray",
        alignItems: "stretch",
      }}
    >
      <CssBaseline />
      <AnkAPIAppBar
        Title={""}
        IsHaveMenu={false}
        OnClickMenuButton={OnClickMenuButton}
        IsOpen={open}
      />
      <AnkAPISideBar
        OnClickSidebarButton={OnClickSideButton}
        MenuListMeta={menuList}
        OnChangedSelectedMenu={OnSelectedMenu}
        IsOpen={false}
      />
      {currentPageRender}
    </Box>
  );
}
