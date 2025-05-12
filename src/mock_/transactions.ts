interface Transactions {
  id: string;
  title: string;
  amount: number;
  category: string;
  transactionType: "income" | "exprense";
  day: string;
}
export const transactionMock: Transactions = {
  id: "22a8",
  title: "data",
  amount: 1000,
  category: "Educação Infantil",
  transactionType: "income",
  day: "09/05/2025",
};
