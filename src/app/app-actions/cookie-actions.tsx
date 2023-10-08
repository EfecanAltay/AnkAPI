import { Constrains } from "@/utils/constraints";
import { cookies } from "next/headers";

export async function clearToken() {
    cookies().delete(Constrains.AuthToken_Cookie_Name);
}