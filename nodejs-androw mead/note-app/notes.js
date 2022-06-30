const fs = require("fs");

function getNote(title, body) {
  const notes = loadNote();
  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    console.log("note added successfully");
  } else {
    console.log("already same title note added");
  }

  saveNote(notes);
}

const saveNote = function (notes) {
  const newNotes = JSON.stringify(notes);
  fs.writeFileSync("notes.json", newNotes);
};

const loadNote = function () {
  try {
    const readNote = fs.readFileSync("notes.json");
    const buffer = readNote.toString();
    return (data = JSON.parse(buffer));
  } catch (error) {
    return [];
  }
};

//remove note
const removeNote = function (title) {
  const notesBuffer = fs.readFileSync("notes.json");
  const notesJSON = notesBuffer.toString();
  const data = JSON.parse(notesJSON);

  const filterData = data.filter((note) => {
    return note.title !== title
  });

  if (data.length > filterData.length) {
    console.log(`title ${title} remove successfully`);

    const newFilteredData = JSON.stringify(filterData);
    fs.writeFileSync("notes.json", newFilteredData);
  } else {
    console.log("your entered title is not found");
  }
};

//read notes

const readNote = function (title){

  const notesBuffer = fs.readFileSync("notes.json");
  const notesJSON = notesBuffer.toString();
  const data = JSON.parse(notesJSON);

  const filterData = data.find((note) => {
    return note.title === title
  });

  // filterData.map((x) => {
  //   if(x.title === title){
  //     return console.log(x.title, x.body)
  //   }else{
  //    return console.log('nothing found')
  //   }
  // })

  if(filterData){
    console.log(filterData.title, filterData.body)
  }else{
    console.log("nothing found")
  }

}

module.exports = { getNote, removeNote, readNote };
