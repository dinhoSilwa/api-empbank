import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" }),
  amount: z.number({ required_error: "Valor é obrigatório" }),
  day: z.string({ required_error: "Dia é obrigatório" }),
  transactionType: z.enum(["income", "expense"], {
    required_error: "Tipo de transação é obrigatório",
    invalid_type_error:
      "Tipo de transação inválido. Use 'income' ou 'expense'.",
  }),
  category: z.string({ required_error: "Título é obrigatório" }),
});
