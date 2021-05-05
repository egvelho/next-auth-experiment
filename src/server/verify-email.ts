import parse from "src/validation/parse";
import api from "src/api";
import prisma from "src/prisma";
import { Role } from "src/auth/types";
import Token from "src/auth/token";
import EmailToken from "src/email/email-token";
import ValidEmailToken from "src/email/valid-email-token";

export default api.verifyEmail(async (data) => {
  const [validMailToken, errors] = await parse(ValidEmailToken, data);
  const withErrors = errors.length > 0;

  if (withErrors) {
    return {
      errors,
      success: false,
    };
  }

  const maybePayload = await EmailToken.decode(validMailToken.token);

  if (maybePayload === undefined) {
    return {
      errors,
      success: false,
    };
  }

  const maybeUser = await prisma.user.findUnique({
    where: {
      id: maybePayload.id,
    },
  });

  if (maybeUser === null) {
    return {
      errors,
      success: false,
    };
  }

  await prisma.user.update({
    data: {
      isEmailVerified: true,
    },
    where: {
      id: maybePayload.id,
    },
  });

  const token = await Token.encode({
    id: maybeUser.id,
    role: maybeUser.role as Role,
  });

  const success = token !== undefined;

  return {
    errors,
    success,
    token,
  };
});
