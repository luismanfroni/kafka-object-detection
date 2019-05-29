var sqlite3 = require('sqlite3').verbose();
var path = "";

function getDatabase() { 
    let db = new sqlite3.Database(path,
        (error) => console.log(error.message));
    return db;
}

const initDB = (_path) => {
    path = _path;

    var createTables = false;
    var fs = require('fs');
    fs.exists(path,
        (exists) => createTables = !exists
    );

    if(createTables) {
        let db = getDatabase(path);
        db.serialize(function() {
            db.run(
                `
                    CREATE TABLE Tweet (
                        ID BIGINT,
                        MediaUrl TEXT,
                        TextBody TEXT
                    );

                    CREATE TABLE Object (
                        TweetID BIGINT,
                        Name TEXT,
                        Positions TEXT
                    );
                `
            );
        });
        db.close();
    }
};

const insertNewObjects = (tweet, objects) => {
    let db = getDatabase(path);

    db.run(`
        INSERT INTO Tweet (ID, MediaUrl, TextBody)
        VALUES (${ tweet.id.toString() }, '${ tweet.url.replace("'", "''") }', '${ tweet.text.replace("'", "''") }');
    `);

    objects.forEach(object => {
        db.run(`
            INSERT INTO Object (TweetID, Name, Positions)
            VALUES (${ tweet.id.toString() }. '${ object.name.replace("'", "''") }', '${ object.positions.replace("'", "''") }');
        `); 
    });

    console.log({
        "tweet": tweet,
        "objects": objects
    });
};

module.exports.initDatabase = initDB;
module.exports.new = insertNewObjects;
