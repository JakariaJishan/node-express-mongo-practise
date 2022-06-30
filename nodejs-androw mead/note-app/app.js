const fs = require("fs");
const yargs = require("yargs");
const { getNote, removeNote, readNote } = require("./notes");
// fs.writeFileSync('demo.txt', 'my name is jack')
// fs.appendFileSync('demo.txt', ' my name is jishan')

// console.log(getNote())

yargs.command({
  command: "read",
  describe: "Listing the notes",
  builder:{
    describe: "read note title",
    demandOption: true,
    type: "string",    
  },
  handler: function (argv) {
    readNote(argv.title)
  },
});

yargs.command({
  command: "add",
  describe: "read the notes",
  builder: {
    title: {
      describe: "read note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    getNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    removeNote(argv.title);
  },
});

yargs.parse();
