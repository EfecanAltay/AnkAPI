"use client";

import "./components.css";
import "./content-page.css";
import * as React from "react";
import { Box, Container, Grid, Stack, Theme, useTheme } from "@mui/material";
import { ContentMeta } from "@/common/content-meta";

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

export default function UIBaseContentPage(contentMeta: ContentMeta) {
  const theme = useTheme();
  const [contentSize, setContentSize] = React.useState([0, 0]);
  const [sideBarShowing, setSideBarShowing] = React.useState(false);

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
        width:10,
        height: contentSize[1],
      }}>
          {contentMeta?.children}
     
    </Box>
  );
}
