import mongoose, { Schema, Document, Model } from "mongoose"

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  amount: number
  category: string
  date: Date
}

const ExpenseSchema: Schema<IExpense> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const Expense: Model<IExpense> =
  mongoose.models.Expense ||
  mongoose.model<IExpense>("Expense", ExpenseSchema)

export default Expense