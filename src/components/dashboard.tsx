"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AnkAPIAppBar from "./app-bar/ankapi-appbar";
import { Suspense, useRef } from "react";
import { ISnackbar } from "@/common/snackbar.interface";
import AnkAPISideBar from "./app-bar/ankapi-sidebar";
import UIBaseContentPage from "./content-page";
import UIEmptyContentPage from "./contents/empty-content.page";
import { MenuItemData } from "@/common/menu-item";
import dynamic from "next/dynamic";
import { ContentTabItem } from "@/common/content-tab-meta";
import { ContentMenuItemType } from "@/common/content-meta";

const UICreateAPIPage = dynamic(() => import("./contents/create-api.page"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = React.useState("CAR");
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

  const menuList: MenuItemData[] = [];


  menuList.push({
    Name: "API Request",
    MenuKey: "CAR",
    PageContent: <UICreateAPIPage />,
    ContentHeaderInfo: {
      IsHaveContentMenu: true,
      IsHaveContentTab: true,
      ContentMenuList: [
        {
          Name: "TEST 0",
          MenuKey: "TEST0",
          MenuType: ContentMenuItemType.Directory,
          Children: [
            {
              Name: "TEST 00",
              MenuKey: "TEST00",
              MenuType: ContentMenuItemType.Content
            },
          ],
        },
        {
          Name: "TEST 1",
          MenuKey: "TEST1",
        },
        {
          Name: "TEST 2",
          MenuKey: "TEST2",
          MenuType: ContentMenuItemType.Directory,
          Children: [
            {
              Name: "TEST 20",
              MenuKey: "TEST20",
              MenuType: ContentMenuItemType.Directory,
              Children: [
                {
                  Name: "TEST 200",
                  MenuKey: "TEST200",
                  MenuType: ContentMenuItemType.Content,
                },
                {
                  Name: "TEST 201",
                  MenuKey: "TEST201",
                  MenuType: ContentMenuItemType.Content,
                },
              ],
            },
            {
              Name: "TEST 21",
              MenuKey: "TEST21",
              MenuType: ContentMenuItemType.Content,
            },
          ],
        },
      ],
    },  } as MenuItemData);


  menuList.push({ Name: "Request Flow", MenuKey: "RF" } as MenuItemData);

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
