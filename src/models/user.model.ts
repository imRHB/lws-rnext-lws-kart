import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    saved: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
    saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

const User = models.User || model("User", UserSchema);

export default User;
