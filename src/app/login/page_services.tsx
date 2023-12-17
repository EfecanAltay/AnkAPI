"use server";

import { Constrains } from "@/utils/constraints";
import { UserLoginData } from "@/common/login-user.data";
import { cookies } from "next/headers";

export async function login(userLoginData : UserLoginData) {
  if (userLoginData.Username === "admin" && userLoginData.Password === "admin") {
    cookies().set(Constrains.AuthToken_Cookie_Name, "token");
    return true;
  }
  return false;
}

export async function register(userData: UserLoginData) {
  console.log(userData);
}