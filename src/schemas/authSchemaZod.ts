import { z } from "zod";

export const createAuthZodSchema = z.object({
  name: z.string({ required_error: "O nome é obrigatório" }),
  email: z.string({ required_error: "O Email é obrigatório" }),
  password: z.string({ required_error: "a Senha é obrigatória" }),
});
