import parse from "src/validation/parse";
import api from "src/api";
import prisma from "src/prisma";
import { Role } from "src/auth/types";
import EmailToken from "src/email/email-token";
import ValidEmailVerification from "src/email/valid-email-verification";
import emailVerification from "src/email/email-verification";

export default api.emailVerificationCode(async (data) => {
  const [{ email }, errors] = await parse(ValidEmailVerification, data);
  const withErrors = errors.length > 0;

  if (withErrors) {
    return {
      errors,
      success: false,
    };
  }

  const maybeUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (maybeUser === null) {
    return {
      errors,
      success: false,
    };
  }

  const code = EmailToken.generateCode();
  const token = await EmailToken.encode({
    code,
    id: maybeUser.id,
    role: maybeUser.role as Role,
  });

  const success = token !== undefined;

  if (success) {
    emailVerification(email, code);
  }

  return {
    errors,
    success,
    token,
  };
});
