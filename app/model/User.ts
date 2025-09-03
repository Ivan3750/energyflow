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
    active?: boolean;
  removed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, trim: true },
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    weight: { type: Number, min: 0, max: 150 },
    height: { type: Number, min: 0, max: 150 },
    sex: { type: String, enum: ["male", "female", "other"] },
    active: { type: Boolean, default: false },
    removed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
