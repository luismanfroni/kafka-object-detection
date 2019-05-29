var sqlite3 = require('sqlite3').verbose();
var path = "";

function getDatabase() { 
    let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (error) => console.log(error));
    return db;
}

const initDB = (_path) => {
    path = _path;

    let db = getDatabase(path);
    db.serialize(function() {
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Tweet (
                    ID BIGINT,
                    MediaUrl TEXT,
                    TextBody TEXT
                );

                CREATE TABLE IF NOT EXISTS Object (
                    TweetID BIGINT,
                    Name TEXT,
                    Positions TEXT
                );
            `
        );
    });
    db.close((er) => console.log(er));
};
var time = 0;
const insertNewObjects = (tweet, objects) => {
    time += 400;
    setTimeout( () => {
        try {
            let db = getDatabase(path);
            db.serialize(function() {
                db.run(`
                    INSERT INTO Tweet (ID, MediaUrl, TextBody)
                    VALUES (${ tweet.id.toString() }, '${ tweet.url.replace("'", "''") }', '${ tweet.text.replace("'", "''") }');
                `);

                objects.forEach(object => {
                    db.run(`
                        INSERT INTO Object (TweetID, Name, Positions)
                        VALUES (${ tweet.id.toString() }. '${ object.name.replace("'", "''") }', '${ JSON.stringify(object.boundingPoly).replace("'", "''") }');
                    `);
                });
            });
            
            console.log({
                "tweet": tweet,
                "objects": objects
            });
            
            db.close(
                (er) => console.log(er)
                );
                
        } catch(er) { console.log("Error ocurred when using DataBase: ", er); }
        if (time > 400)
            time -= 400;
    }, time);
};

module.exports.initDatabase = initDB;
module.exports.new = insertNewObjects;
