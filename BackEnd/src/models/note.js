import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
