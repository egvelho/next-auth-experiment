import { useContext } from "react";
import { Context } from "src/context";

export default function Index() {
  const { setContext } = useContext(Context);
  return (
    <div>
      <button onClick={() => setContext({ accountView: "login" })}>
        Click me
      </button>
    </div>
  );
}
