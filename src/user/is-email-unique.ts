import { ValidationOptions } from "class-validator";
import prisma from "src/prisma";
import createValidator from "src/validation/create-validator";

const IsEmailUnique = createValidator<
  (validationOptions?: ValidationOptions) => never
>({
  name: "isEmailUnique",
  constraintsLength: 0,
  async validate(email: string) {
    const maybeUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return maybeUser === null;
  },
});

export default IsEmailUnique;
