"use client";

import "./style.css";

import { login } from "./page_services";
import { UserLoginData } from "@/common/login-user-data";
import { ShowError } from "../app-actions/popup-actions";
import SnackbarContextData from "@/common/contexts/snackbar.context";

export async function LoginAction(_snackbarContext: SnackbarContextData, username: string, password : string) {
  const userLoginData = new UserLoginData();
  userLoginData.Username = username;
  userLoginData.Password = password;
  console.log(username);
  if (!(await login(userLoginData))) {
    ShowError(_snackbarContext, "Kullanıcı adı veya şifre Hatalıdır.");
  }
}