function getAllNotes(req,res){
    res.status(200).send("You fetch notes")
}

function createNotes(req,res){
    res.status(201).json({message:"You created a note"})
}

function updateNote(req,res){
    res.status(200).jsopn({message:"You updated a note"})
}

function deleteNote(req,res){
    res.status(201).json({message:"You deleted a note"})
}


export {
getAllNotes,
createNotes,
updateNote,
deleteNote




}