const mysql = require("mysql");

const database = mysql.createConnection({
    "host": process.env.MYSQL_HOST,
    "user": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE
});
console.log("god help me");

async function executeQuery(query) {
    return new Promise((res, rej) => {
        database.query(query, (error, results) => {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        });
    });
}

module.exports = {
    executeQuery
};