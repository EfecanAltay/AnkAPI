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
import { Backdrop, CircularProgress } from "@mui/material";
import Loading from "@/app/dashboard/loading";

const UICreateAPIPage = dynamic(()=>import("./contents/create-api.page"),
{
  loading:()=> 
      <p>Loading...</p>,
      ssr:false
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
  } as MenuItemData);
  menuList.push({ Name: "Request Flow", MenuKey: "RF" } as MenuItemData);

  function getPage(menuKey: string): any {
    const contentPage = menuList.find(
      (x) => x.MenuKey === menuKey
    )?.PageContent;

    return contentPage ?  contentPage : <UIEmptyContentPage />;
  }

  return (
    <Box sx={{  display: "flex", flexDirection:"row", height:"100%", backgroundColor:"gray", alignItems:"stretch"}}>
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
