import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // commenter
  report: { type: Schema.Types.ObjectId, ref: "Report", required: true }, // report id
  text: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;