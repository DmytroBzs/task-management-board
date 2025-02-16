import crypto from "crypto";

export const generateHash = () => {
  return crypto.randomBytes(8).toString("hex");
};
