import Note from "../models/note.js";

async function getAllNotes(_, res) {
  try {
    const notes = (await Note.find()).sort({createdAt:-1});//Newest post first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createNote(req, res) {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields!" });
    }

    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found." });
    res.status(200).json(updatedNote);
  } catch (error) {
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

async function getNote(req,res){
    try {
        const notes = await Note.findById(req.params.id);
        if(!notes) return res.status(404).json({message:"Note not found!"})
        res.json(notes)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getAllNotes, createNote, updateNote, deleteNote, getNote };
