import Dashboard from "@/components/dashboard";
import Login from "./login/page";
import { Constrains } from "@/utils/constraints";
import { cookies } from 'next/headers'

export default function Index() {
  const cookieStore = cookies();
  const auth_token = cookieStore.get(Constrains.AuthToken_Cookie_Name);
  if (auth_token) {
    return (
      <Dashboard></Dashboard>
    );
  }
  return (
      <Login></Login>
  );
}