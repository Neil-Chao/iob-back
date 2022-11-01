const mysql = require("mysql")
const fs = require("fs")
const { parse } = require('fast-csv');
const readline = require('readline')

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

function insert_stuclass(uid, class_no) {
    const addSql = 'INSERT INTO class_student(uid,class_no) VALUES(?,?)';
    const addSqlParams = [uid, class_no];
    connection.query(addSql, addSqlParams, (err, result) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
        }
    });
}

const rl = readline.createInterface({
    input: fs.createReadStream('D:\\Neil\\DataSet\\dataset\\education\\class.csv', {encoding: "utf-8"})
})

const stream = parse({ encoding: "utf-8" })
    .on('error', error => console.error(error))
    .on('data', row => {
        const uid = row[0]
        for(let v of row.slice(1)) {
            if(v == "") {
                continue
            }
            insert_stuclass(uid, v)
        }
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

rl.on('line', line => {
    stream.write(line)
    stream.write('\n')
})

rl.on('close', () => {
    stream.end();
    
})

// connection.end()


// Object.keys(classInfo).forEach((key) => {
//     const value = classInfo[key]
//     const location = value["location"]
//     const periods = value["periods"]
//     insert_classinfo(key, location)
//     periods.forEach((v) => {
//         const day = v["day"]
//         const start_time = v["start"]
//         const end_time = v["end"]
//         insert_classperiod(day, start_time, end_time, key)
//     })
// });

