"use client";
import * as React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { ITextInput } from "@/common/textInput.interface";

type QuoteState = {
  currentIndex: number;
  showPassword: boolean;
  handleClickShowPassword: Function;
  handleMouseDownPassword: Function;
};

export default function UIPasswordInput(iTextInput: ITextInput) {
  const [showPassword, setShowPassword] = React.useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function OnTextChanged(event:any){
    iTextInput.OnTextChanged?.(event.target.value);
  }

  return (
    <TextField
      id="filled-basic"
      label="Password"
      variant="filled"
      type={showPassword ? "text" : "password"}
      value={iTextInput.Text}
      onChange={OnTextChanged}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
