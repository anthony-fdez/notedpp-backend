import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUser extends Document, IUserInput {}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

UserSchema.pre<IUser>("save", async function (this, next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model<IUser>("User", UserSchema);
