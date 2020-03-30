const fs = require("fs-extra");
const path = require("path");
const cwd = process.cwd();


const json = fs.readJsonSync(`${cwd}/mock-server/db.json`, { throws: false });
console.log(json);
if (!json) { //check if db.json exist
  const klawSync = require("klaw-sync");

  let files = [];
  try {
    files = klawSync(path.resolve(`${cwd}/mock-server/mocks`), { nodir: true });
  } catch (e) {
    console.warn(`No files found in ${cwd}/mock-server/mocks`);
  }
  const db = {};

  files.forEach(file => {
    const { name } = path.parse(file.path);
    const json = require(file.path);
    Object.assign(db, { [name]: json });
  });

  fs.writeJsonSync(`${cwd}/mock-server/db.json`, db, err => {
    if (err) {
      return console.error(err);
    }
    console.log("Created db.json successfully.");
  });
} else {
  console.log('db.json exists.');
}

