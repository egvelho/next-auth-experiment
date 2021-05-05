export type Role = "user" | "premium-user" | "admin";

export interface Payload {
  id: number;
  role: Role;
}

export interface MailPayload extends Payload {
  code: string;
}
