"use client";

import * as React from "react";
import { Box, useTheme } from "@mui/material";
import "./empty-content.css";

export default function UIEmptyContentPage() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:'100%',
        pt:'20%'
      }}>
        <p className="emptyLabel">
        Empty Page
        </p>
    </Box>
  );
}
