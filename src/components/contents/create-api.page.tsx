"use client";

import * as React from "react";
import { Box, useTheme } from "@mui/material";

export default function UICreateAPIPage() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "green",
        flexGrow: "initial"
      }}>
      Create API Page
    </Box>
  );
}
