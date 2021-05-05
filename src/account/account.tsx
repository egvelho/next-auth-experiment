import React, { useState, useContext, useLayoutEffect } from "react";
import { useFirebaseAuth } from "@egvelho/next-firebase/client";
import {
  Account as MuiAccount,
  AccountProps as MuiAccountProps,
} from "../view/account";
import { Context, ContextProps } from "../context";
import * as types from "./types";
import getLoginProps from "./get-login-props";
import getRecoveryAccountProps from "./get-recovery-account-props";
import getCreateAccountProps from "./get-create-account-props";
import getFormState from "./get-form-state";

export default function Account() {
  const form = getFormState();
  const firebaseAuth = useFirebaseAuth();
  const { context, setContext } = useContext(Context);
  const view = context.accountView;
  const setView = (accountView: MuiAccountProps["view"]) =>
    setContext({ accountView });
  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const loading = context.loading;
  const setLoading = (loading: boolean) => setContext({ loading });
  const setToken = (token: ContextProps["token"]) => setContext({ token });
  const setSnackbarContent = (
    snackbarContent: ContextProps["snackbarContent"],
  ) => setContext({ snackbarContent });

  const [loginStep, setLoginStep] = useState(
    "login" as types.LoginProps["step"],
  );
  const [createAccountStep, setCreateAccountStep] = useState(
    "personal-data" as types.CreateAccountProps["step"],
  );
  const [recoveryAccountStep, setRecoveryAccountStep] = useState(
    "email-code" as types.RecoveryAccountProps["step"],
  );

  const onRequestClose = () => {
    if (loading) {
      return;
    } else if (view === "login" && loginStep === "login") {
      setView(undefined);
    } else if (
      view === "create-account" &&
      createAccountStep === "personal-data"
    ) {
      setView(undefined);
    } else if (
      view === "recovery-account" &&
      recoveryAccountStep === "email-code"
    ) {
      setView(undefined);
    }
  };

  const onBackButtonClick = () => {
    if (loading) {
      return;
    } else if (view === "login") {
      if (loginStep === "phone-verification") {
        setLoginStep("login");
        setBackButtonVisible(false);
      }
    } else if (view === "create-account") {
      if (createAccountStep === "personal-data") {
        setView("login");
        setBackButtonVisible(false);
      } else if (createAccountStep === "phone-verification") {
        setCreateAccountStep("personal-data");
      }
    } else if (view === "recovery-account") {
      setView("login");
      setBackButtonVisible(false);
    }
  };

  const accountState: types.AccountState = {
    form,
    firebaseAuth,
    view,
    setView,
    backButtonVisible,
    setBackButtonVisible,
    loading,
    setLoading,
    setToken,
    setSnackbarContent,
    loginStep,
    setLoginStep,
    createAccountStep,
    setCreateAccountStep,
    recoveryAccountStep,
    setRecoveryAccountStep,
    onRequestClose,
    onBackButtonClick,
  };

  useLayoutEffect(() => {
    if (view === undefined) {
      setLoginStep("login");
      setCreateAccountStep("personal-data");
      setRecoveryAccountStep("email-code");
      form.reset();
    }
  }, [view]);

  useLayoutEffect(() => {
    if (createAccountStep === "personal-data") {
      form.setFormState({ code: "" });
    }
  }, [createAccountStep]);

  useLayoutEffect(() => {
    if (recoveryAccountStep === "email-code") {
      form.setFormState({ code: "" });
    } else if (recoveryAccountStep === "update-phone") {
      form.setFormState({ code: "" });
    }
  }, [recoveryAccountStep]);

  useLayoutEffect(() => {
    setLoading(firebaseAuth.loading);
  }, [firebaseAuth.loading]);

  return (
    <>
      <MuiAccount
        view={view}
        onRequestClose={onRequestClose}
        backButtonVisible={backButtonVisible}
        onBackButtonClick={onBackButtonClick}
        loginProps={getLoginProps(accountState)}
        recoveryAccountProps={getRecoveryAccountProps(accountState)}
        createAccountProps={getCreateAccountProps(accountState)}
      />
    </>
  );
}
