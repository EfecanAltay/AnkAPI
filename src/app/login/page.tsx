"use client";
import UIButton from "@/components/button";
import UIPasswordInput from "@/components/ui-password-input";
import { AccountCircle } from "@mui/icons-material";
import { Paper, TextField, Stack, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import UISnackbars from "@/components/snackbar";
import { ThemeContext } from "@emotion/react";
import { LoginAction } from "./page_actions";
import { SnackbarContext } from "@/app/app_contexts";

export default function LoginPage() {
  const router = useRouter();
  const _themeref = useContext(ThemeContext);
  const _snackbarContextRef = useContext(SnackbarContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function UserNameTextChanged(event: any) {
    setUsername(event.target.value);
  }
  function PasswordTextChanged(val: string) {
    setPassword(val);
  }
  return (
    <ThemeContext.Provider value={_themeref}>
      <main className="flex min-h-screen flex-col">
        <div className="self-center">
          <Paper
            elevation={24}
            sx={{
              p: 2,
              marginTop: 20,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gap: 2,
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <p className="header">Login</p>
              <TextField
                id="filled-basic"
                label="UserName"
                variant="filled"
                value={username}
                onChange={UserNameTextChanged}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <UIPasswordInput
                Text={password}
                OnTextChanged={PasswordTextChanged}
              ></UIPasswordInput>
              <UIButton
                Text="Login"
                OnAction={async () =>
                  await LoginAction(_snackbarContextRef, username, password)
                }
              ></UIButton>
            </Stack>
          </Paper>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: 2,
            }}
            spacing={2}
          >
            <UIButton
              Variant="outlined"
              Text="Register"
              OnAction={() => router.push("/register")}
            ></UIButton>
          </Stack>
        </div>
        <SnackbarContext.Provider value={_snackbarContextRef}>
          <UISnackbars ref={_snackbarContextRef.ref}></UISnackbars>
        </SnackbarContext.Provider>
      </main>
    </ThemeContext.Provider>
  );
}
