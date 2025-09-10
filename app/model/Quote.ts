import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuote extends Document {
  author: string;
  quote: {
    en: string;
    pl: string;
    ua: string;
  };
  createdAt: Date;
}

const quoteSchema = new Schema<IQuote>(
  {
    author: { type: String, required: true },
    quote: {
      en: { type: String, required: true },
      pl: { type: String, required: true },
      ua: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Quote: Model<IQuote> = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;
