import React from "react";
import { Constrains } from "@/utils/constraints";
import { cookies } from 'next/headers'
import { Suspense } from "react";
import Loading from "./dashboard/loading";

const Login = React.lazy(() => import("./login/page"));
const Dashboard = React.lazy(() => import("@/components/dashboard"));

export default function Index() {
  const cookieStore = cookies();
  const auth_token = cookieStore.get(Constrains.AuthToken_Cookie_Name);
  if (auth_token) {
    return (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
        <Login/>
    </Suspense>
  );
}