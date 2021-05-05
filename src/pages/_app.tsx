import "reflect-metadata";
import { ReactNode, useContext } from "react";
import dynamic from "next/dynamic";
import { app } from "@egvelho/next-material-boilerplate";
import { WithToken } from "@egvelho/next-utils/client";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import client from "src/client";
import { Context, ContextProvider } from "src/context";
import WithUser from "src/user/with-user";
import "typeface-roboto";
import "material-icons/css/material-icons.css";

const DynamicAccount = dynamic(() => import("src/account/account"), {
  ssr: false,
});

const DynamicVerifyEmail = dynamic(() => import("src/email/verify-email"), {
  ssr: false,
});

const DynamicWithFirebase = dynamic(
  async () => (await import("@egvelho/next-firebase/client")).WithFirebase,
  { ssr: false },
);

function Layout({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <NestedLayout>{children}</NestedLayout>
    </ContextProvider>
  );
}

function NestedLayout({ children }: { children: ReactNode }) {
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
      <DynamicWithFirebase analytics />
      {children}
    </>
  );
}

export default app({
  Layout,
  ThemeProvider,
  CssBaseline,
  theme: createMuiTheme(),
});
