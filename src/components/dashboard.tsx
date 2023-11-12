"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AnkAPIAppBar from "./app-bar/ankapi-appbar";
import UISnackbars from "./snackbar";
import { useRef } from "react";
import { ISnackbar } from "@/common/snackbar.interface";
import AnkAPISideBar from "./app-bar/ankapi-sidebar";
import UIBaseContentPage from "./content-page";
import UICreateAPIPage from "./contents/create-api.page";
import UIEmptyContentPage from "./contents/empty-content.page";
import { MenuItemData } from "@/common/menu-item";

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
  } as MenuItemData);
  menuList.push({ Name: "Request Flow", MenuKey: "RF" } as MenuItemData);

  function getPage(menuKey: string): any {
    const contentPage = menuList.find(
      (x) => x.MenuKey === menuKey
    )?.PageContent;
    return contentPage ? contentPage : <UIEmptyContentPage />;
  }

  return (
    <Box sx={{  display: "flex", flexDirection:"row", alignItems:"stretch"}}>
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
        OnChangedSelectedMenu={OnSelectedMenu} IsOpen={false} />
      <UIBaseContentPage>{getPage(selectedMenuKey)}</UIBaseContentPage>
    </Box>
  );
}
