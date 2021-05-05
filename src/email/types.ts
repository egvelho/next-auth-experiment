import { Payload } from "src/auth/types";

export interface EmailPayload extends Payload {
  code: string;
}
