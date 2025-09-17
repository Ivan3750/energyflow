import mongoose, { Schema, model, Model } from "mongoose";

interface ITranslation {
  ua: string;
  en: string;
  pl: string;
}

interface IMuscle {
  name: string;
  filter: ITranslation;
  imgUrl: string;
  translations: ITranslation;
}

const TranslationSchema: Schema<ITranslation> = new Schema(
  {
    ua: { type: String, required: true },
    en: { type: String, required: true },
    pl: { type: String, required: true },
  },
  { _id: false }
);

const MuscleSchema: Schema<IMuscle> = new Schema({
  name: { type: String, required: true },
  filter: { type: TranslationSchema, required: true },
  imgUrl: { type: String, required: true },
  translations: { type: TranslationSchema, required: true },
});

export default mongoose.models.Muscle
  ? (mongoose.models.Muscle as Model<IMuscle>)
  : model<IMuscle>("Muscle", MuscleSchema);
