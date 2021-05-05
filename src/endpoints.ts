import { endpoint } from "@egvelho/next-metadata";
import type { User } from "@prisma/client";
import type { ValidationError } from "class-validator";
import type ValidLogin from "src/auth/valid-login";
import type ValidNewUser from "src/user/valid-new-user";
import type ValidNewPhoneNumber from "src/user/valid-new-phone-number";
import type ValidEmailVerification from "src/email/valid-email-verification";
import type ValidEmailToken from "src/email/valid-email-token";

interface OperationResponse {
  errors: ValidationError[];
  success: boolean;
}

type TokenResponse = OperationResponse & {
  token?: string;
};

export default {
  createAccount: endpoint<ValidNewUser, TokenResponse>(
    "PUT",
    "/api/account/create-account",
  ),
  login: endpoint<ValidLogin, TokenResponse>("POST", "/api/login"),
  emailVerificationCode: endpoint<ValidEmailVerification, TokenResponse>(
    "POST",
    "/api/account/email-verification-code",
  ),
  verifyEmail: endpoint<ValidEmailToken, TokenResponse>(
    "POST",
    "/api/account/verify-email",
  ),
  updatePhoneNumber: endpoint<ValidNewPhoneNumber, OperationResponse>(
    "PATCH",
    "/api/account/update-phone-number",
  ),
  getUser: endpoint<{}, { user?: User }>("GET", "api/get-user"),
};
