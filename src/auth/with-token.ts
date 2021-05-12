import { useEffect } from "react";

export interface WithTokenProps {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

export default function WithToken({ token, setToken }: WithTokenProps) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      setToken(undefined);
    } else {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token ?? "");
  }, [token]);

  return null;
}
