import { z } from "zod";
import { iso } from "zod/v4-mini";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.string()
});

export type ExpenseType = z.infer<typeof expenseSchema>;

