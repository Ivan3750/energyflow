import { Schema, model, models } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  weight?: number;
  height?: number;
  sex?: "male" | "female" | "other";
  birthday?: Date;
  favoriteExercises?: string[];
  profilePhoto?: string;
  active?: boolean;
  removed?: boolean;
  pushNotifications?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lang?: string;
  theme?: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, trim: true },
    weight: { type: Number, min: 0, max: 150 },
    height: { type: Number, min: 0, max: 150 },
    sex: { type: String, enum: ["male", "female", "other"] },
    birthday: { type: Date },
    favoriteExercises: { type: [String], default: [] },
    profilePhoto: { type: String, default: "" },
    active: { type: Boolean, default: true },
    removed: { type: Boolean, default: false },
    pushNotifications: { type: Boolean, default: false },
    emailNotifications: { type: Boolean, default: false },
    smsNotifications: { type: Boolean, default: false },
    lang: { type: String, enum: ["EN", "UA", "PL"], default: "EN" },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
  },
  { timestamps: true }
);


const User = models.User || model<IUser>("User", UserSchema);
export default User;
