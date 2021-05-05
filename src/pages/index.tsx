import { useContext } from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
import { AccountModal } from "../account-modal";
import { Context } from "../context";

interface Content {
  message: AlertProps["children"];
  severity: AlertProps["severity"];
}

export interface SnackbarProps {
  content: Content;
  setContent: (content: Content) => void;
}

const emptyContent: Content = {
  message: undefined,
  severity: undefined,
};

function Snackbar({
  content: { message, severity },
  setContent,
}: SnackbarProps) {
  return (
    <>
      {message !== undefined && (
        <MuiSnackbar
          open={message !== undefined}
          autoHideDuration={6000}
          onClose={() => setContent(emptyContent)}
        >
          <Alert
            onClose={() => setContent(emptyContent)}
            severity={severity ?? "info"}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
}

export default function Index() {
  const { context, setContext } = useContext(Context);
  return (
    <div>
      <button onClick={() => setContext({ accountView: "login" })}>
        Click me
      </button>
      <Snackbar
        content={context.snackbarContent}
        setContent={(snackbarContent) => setContext({ snackbarContent })}
      />
      <AccountModal />
    </div>
  );
}
