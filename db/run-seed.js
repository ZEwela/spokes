const seed = require('./seed');
const db = require('./index');

seed().then(() => {
    return db.end();
});