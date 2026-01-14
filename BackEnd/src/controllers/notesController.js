import Note from "../models/note.js";

async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //Newest post first
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createNote(req, res) {
  const { title, content, techStack, liveUrl, githubUrl } = req.body;
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields!" });
    }

    const note = new Note({
      title,
      content,
      techStack: techStack || [],
      liveUrl,
      githubUrl,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateNote(req, res) {
  try {
    const { title, content, techStack, liveUrl, githubUrl, featured } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (techStack !== undefined) updateData.techStack = techStack;
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (featured !== undefined) updateData.featured = featured;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Nothing to update." });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getNote(req, res, next) {
  try {
    const notes = await Note.findById(req.params.id);
    if (!notes) return res.status(404).json({ message: "Note not found!" });
    res.json(notes);
  } catch (error) {
    next(error);
  }
}

export { getAllNotes, createNote, updateNote, deleteNote, getNote };
