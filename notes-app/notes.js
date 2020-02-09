const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataString = dataBuffer.toString();

    return JSON.parse(dataString);
  } catch (error) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);

  fs.writeFileSync("notes.json", dataJSON);
};

const addNote = ({ title, body }) => {
  const notes = loadNotes();
  const exists = notes.find(note => note.title === title);

  if (!exists) {
    notes.push({
      title,
      body
    });

    console.log(
      chalk.green.inverse("New note added: "),
      chalk.green(`${JSON.stringify({ title, body })}`)
    );

    saveNotes(notes);
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);

  if (notes.length > newNotes.length) {
    console.log(
      chalk.red.inverse("Note to remove:"),
      chalk.red(`title ${title}`)
    );

    saveNotes(newNotes);
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.magenta.inverse("All notes:"));

  notes.forEach(note => {
    console.log(chalk.magenta(JSON.stringify(note)));
  });

  console.log(chalk.magenta.inverse("End all notes:"));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(
      chalk.green.inverse("Note find"),
      chalk.green(JSON.stringify(note))
    );
  } else {
    console.log(
      chalk.red.inverse("Note not find"),
      chalk.green(`Search title: ${title}`)
    );
  }
};

module.exports = {
  add: addNote,
  remove: removeNote,
  list: listNotes,
  read: readNote
};
