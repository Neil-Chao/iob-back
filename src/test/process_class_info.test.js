const mysql = require("mysql")
const fs = require("fs")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'iob'
})

connection.connect();

function insert_classinfo(class_no, location) {
    const addSql = 'INSERT INTO class_info(class_no,location) VALUES(?,?)';
    const addSqlParams = [class_no, location];
    connection.query(addSql, addSqlParams, (err, result) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
        }
    });
}

function insert_classperiod(dow, start_time, end_time, class_no) {
    const addSql = 'INSERT INTO class_period(id,dow,start_time,end_time,class_no) VALUES(null,?,?,?,?)';
    const addSqlParams = [dow, start_time, end_time, class_no];
    connection.query(addSql, addSqlParams, (err, result) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
        }
    });
}

let json = fs.readFileSync('D:\\Neil\\DataSet\\dataset\\education\\class_info.json', 'utf-8')
let classInfo = JSON.parse(json)

Object.keys(classInfo).forEach((key) => {
    const value = classInfo[key]
    const location = value["location"]
    const periods = value["periods"]
    insert_classinfo(key, location)
    periods.forEach((v) => {
        const day = v["day"]
        const start_time = v["start"]
        const end_time = v["end"]
        insert_classperiod(day, start_time, end_time, key)
    })
});

connection.end()