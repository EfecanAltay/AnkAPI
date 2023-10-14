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
import { MenuItemMeta } from "@/common/menu-item-meta";
import CreateIcon from "@mui/icons-material/Create";
import UIBaseContentPage from "./content-page";
import UICreateAPIPage from "./contents/create-api.page";
import UIEmptyContentPage from "./contents/empty-content.page";

const drawerWidth = 240;

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = React.useState("");
  const popupRef = useRef<ISnackbar>(null);

  function OnClickMenuButton() : any {
    setOpen(true);
  }

  function OnClickSideButton() {
    setOpen(false)
  }

  function OnSelectedMenu(selectedMenuKey : string) {
    setSelectedMenuKey(selectedMenuKey);
  }

  const menuList : MenuItemMeta[] = [];
  menuList.push({ Name :"Create API Request", MenuKey:"CAR" , IconRender: ()=>{ return(<CreateIcon/>) }, PageContent: <UICreateAPIPage/> } as MenuItemMeta);
  menuList.push({ Name :"API Request List", MenuKey:"ARL" } as MenuItemMeta);
  menuList.push({ Name :"Request Flow", MenuKey:"RF" } as MenuItemMeta);

  function getPage(menuKey: string) : any {
    const contentPage = menuList.find(x=> x.MenuKey === menuKey)?.PageContent;
    return  contentPage ? contentPage : <UIEmptyContentPage/>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AnkAPIAppBar
        Title={""}
        IsHaveMenu={true}
        OnClickMenuButton={OnClickMenuButton}
        IsOpen={open} />

      <AnkAPISideBar OnClickSidebarButton={OnClickSideButton} IsOpen={open} MenuListMeta={menuList} OnChangedSelectedMenu={OnSelectedMenu} />
      <UIBaseContentPage>
        {
          getPage(selectedMenuKey)
        }
      </UIBaseContentPage>
      <UISnackbars ref={popupRef}></UISnackbars>
    </Box>
  );
}
