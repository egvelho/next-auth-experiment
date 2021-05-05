import React from "react";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { WithToken } from "@egvelho/next-utils/client";
import WithUser from "./user/with-user";
import { Context } from "./context";
import client from "./client";

const DynamicAccount = dynamic(() => import("./account/account"), {
  ssr: false,
});

const DynamicVerifyEmail = dynamic(() => import("./email/verify-email"), {
  ssr: false,
});

const DynamicWithFirebase = dynamic(
  async () => (await import("@egvelho/next-firebase/client")).WithFirebase,
  { ssr: false },
);

export function AccountModal() {
  const { context, setContext } = useContext(Context);
  return (
    <>
      <WithToken
        token={context.token}
        setToken={(token) => setContext({ token })}
      />
      <WithUser
        user={context.user}
        token={context.token}
        getUser={async () => (await client.getUser({})).data.user}
        setUser={async (user) => setContext({ user })}
      />
      <DynamicAccount />
      <DynamicVerifyEmail />
      <DynamicWithFirebase />
    </>
  );
}
