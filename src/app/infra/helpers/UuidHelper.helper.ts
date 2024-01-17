import { randomUUID } from "node:crypto";

export const generate = (): string => {
  return randomUUID();
};
