import api from "src/api";
import Token from "src/auth/token";

export default api.getUser(async (_, request) => {
  const maybeUser = await Token.getUser(request);

  return {
    user: maybeUser ?? undefined,
  };
});
