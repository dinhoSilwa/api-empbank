import { z } from "zod";

export const authSignupSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(1, "O nome não pode estar vazio"),
  email: z
    .string({ required_error: "O Email é obrigatório" })
    .email("Email inválido"),
  password: z
    .string({ required_error: "A Senha é obrigatória" })
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
    ),
});

export const authLoginSchema = z.object({
  email: z
    .string({ required_error: "O Email é obrigatório" })
    .email("Email inválido"),
  password: z
    .string({ required_error: "A Senha é obrigatória" })
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});
