import { ValidationOptions } from "class-validator";
import prisma from "src/prisma";
import createValidator from "src/validation/create-validator";

const IsEmailRegistered = createValidator<
  (validationOptions?: ValidationOptions) => never
>({
  name: "isEmailRegistered",
  constraintsLength: 0,
  async validate(email: string) {
    const maybeUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return maybeUser !== null;
  },
});

export default IsEmailRegistered;
