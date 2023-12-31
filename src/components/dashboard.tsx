"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AnkAPIAppBar from "./app-bar/ankapi-appbar";
import { useRef } from "react";
import { ISnackbar } from "@/common/snackbar.interface";
import AnkAPISideBar from "./app-bar/ankapi-sidebar";
import UIBaseContentPage from "./content-page";
import UIEmptyContentPage from "./contents/empty-content.page";
import { MenuItemData } from "@/common/menu-item";
import dynamic from "next/dynamic";
import { DashboardMeta } from "@/common/dashboard-meta";
import { MockDataProvider } from "@/mockdatas/mockdata-provider";

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

  function OnClickMenuButton(): any {
    setOpen(true);
  }

  function OnClickSideButton() {
    setOpen(false);
  }

  function OnSelectedMenu(selectedMenuKey: string) {
    setSelectedMenuKey(selectedMenuKey);
  }

  function getPage(menuKey: string): MenuItemData | undefined {
    const contentPage = menuList.find((x) => x.MenuKey === menuKey);
    return contentPage;
  }

  const currentPage = getPage(selectedMenuKey);

  const currentPageRender = currentPage ? (
    <UIBaseContentPage ContentHeaderInfo={currentPage.ContentHeaderInfo}>
      {currentPage.PageContent}
    </UIBaseContentPage>
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
