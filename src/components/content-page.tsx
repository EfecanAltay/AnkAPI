"use client";

import "./components.css";
import * as React from "react";
import { Box, Theme, useTheme } from "@mui/material";
import { ContentMeta } from "@/common/content-meta";

function getContentWidth(window: Window, theme: Theme) {
  return window.innerWidth - Number.parseInt(theme.spacing(10)) - 1;
}
function getContentHeight(window: Window, theme: Theme) {
  return window.innerHeight - Number.parseInt(theme.spacing(8));
}

export default function UIContentPage(contentMeta: ContentMeta) {
  const theme = useTheme();
  const [contentSize, setContentSize] = React.useState([
    getContentWidth(window, theme),
    getContentHeight(window, theme),
  ]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setContentSize([getContentWidth(window, theme), getContentHeight(window, theme)]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "green",
        flexGrow: "initial",
        mt: 8,
        minWidth: contentSize[0],
        height: contentSize[1],
      }}>
      {contentMeta?.ContentRender?.()}
    </Box>
  );
}
