const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.version("1.0.0");

// Commands: add, remove, read, list

// add command

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note content",
      demandOption: true,
      type: "string"
    }
  },
  handler({ title, body }) {
    notes.add({
      title,
      body
    });
  }
});

// remove command

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: String
    }
  },
  handler({ title }) {
    notes.remove(title);
  }
});

// read command

yargs.command({
  command: "read",
  describe: "Read a note",
  handler({ title }) {
    notes.read(title);
  }
});

// list command

yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.list();
  }
});

yargs.parse();
