import mongoose from "mongoose";
import UserInterface from "../interfaces/user";

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema<UserInterface>({
  username: {
    type: String,
    minLength: 3,
    required: [true, "username required"],
  },
  name: {
    type: String,
    required: [true, "name required"],
  },
  password: {
    type: String,
    minLength: 3,
    required: [true, "password required"],
  },
});

userSchema.set("toJSON", {
  transform(_doc, ret: UserInterface) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
