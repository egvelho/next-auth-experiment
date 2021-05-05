import { IsOptional } from "class-validator";
import ValidUser from "src/user/valid-user";
import IsEmailUnique from "src/user/is-email-unique";
import IsPhoneNumberUnique from "src/user/is-phone-number-unique";
import IsFirebaseToken from "src/firebase/is-firebase-token";
import IsFirebasePhoneNumber from "src/firebase/is-firebase-phone-number";

const texts = {
  isFirebasePhoneNumberMessage:
    "O número de telefone não corresponse com o que foi verificado",
  isFirebaseTokenMessage: "Houve um erro de autenticação",
  isEmailUnique: "Este email já está cadastrado",
  isPhoneNumberUnique: "Este celular já está cadastrado",
};

export default class ValidNewUser extends ValidUser {
  @IsOptional()
  @IsFirebasePhoneNumber("+55", "phoneNumber", {
    message: () => texts.isFirebasePhoneNumberMessage,
  })
  @IsFirebaseToken({
    message: () => texts.isFirebaseTokenMessage,
  })
  firebaseToken?: string;

  @IsEmailUnique({
    message: () => texts.isEmailUnique,
  })
  email!: string;

  @IsPhoneNumberUnique({
    message: () => texts.isPhoneNumberUnique,
  })
  phoneNumber!: string;
}
