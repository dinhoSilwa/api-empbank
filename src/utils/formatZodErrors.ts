
export const formatterZodError = (errors: any[]) => {
  const formatter: Record<string, string> = {};
  errors.forEach((errorItems) => {
    const fieldError = errorItems.path.join(".");
    formatter[fieldError] = errorItems.message;
  });
  return formatter;
};
