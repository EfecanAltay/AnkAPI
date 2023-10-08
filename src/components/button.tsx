import "./components.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { IButton } from "@/common/button.interface";

export default function UIButton(iButton: IButton) {
  return (
    <Button
      variant={iButton.Variant ? iButton.Variant : "contained"}
      onClick={()=>{ 
        if(iButton.OnAction) iButton.OnAction();
      }}>
      {iButton.Text}
    </Button>
  );
}
