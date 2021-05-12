import "reflect-metadata";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { app } from "@egvelho/next-material-boilerplate";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ContextProvider } from "../context";
import "typeface-roboto";
import "material-icons/css/material-icons.css";

const DynamicWithFirebase = dynamic(
  async () => (await import("@egvelho/next-firebase/client")).WithFirebase,
  { ssr: false },
);

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ContextProvider>
        <div>{children}</div>
      </ContextProvider>
      <DynamicWithFirebase />
    </>
  );
}

export default app({
  Layout,
  ThemeProvider,
  CssBaseline,
  theme: createMuiTheme(),
});
