const DB = require('./store');

let db = new DB();
db.search('CASA DE ANA', null)
.then(list => {
  console.log(list);
  process.exit();
}, (err) => {
  console.log(err);
  process.exit();
});
