import { model, models, Schema } from "mongoose";

export interface IUser {}

const UserSchema = new Schema<IUser>({});

const User = models.User || model("User", UserSchema);

export default User;
