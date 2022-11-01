import mysql from "../../public/mysql_session";
import {
    composeListWithDotSplitting
} from "../../util/CommonUtil";


/**
 * Add behavior instance to mysql database.
 * @param {*} uid 
 * @param {*} begin_time 
 * @param {*} light 
 * @param {*} type1 
 * @param {*} name 
 * @param {*} params 
 */
async function insertBehaviorInstance(fields, values) {
    const sql = 'INSERT INTO behavior('
        + composeListWithDotSplitting(fields)
        + ') VALUES('
        + composeListWithDotSplitting(Array(fields.length).fill("?"))
        + ')';

    return new Promise((resolve, reject) => {
        mysql.query(sql, values, (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            } else {
                resolve(result)
            }
        })
    })
}

async function searchLatestBehavior() {
    const sql = 'SELECT *, (NOW()-begin_time) as diff FROM behavior ORDER BY diff ASC LIMIT 0, 1';
    return new Promise((resolve, reject) => {
        mysql.query(sql, (err, result)=>{
            if(err) {
                console.log(err)
                reject(null)
            } else {
                if(result.length > 0) {
                    resolve(result[0])
                } else {
                    resolve(null)
                }
                
            }
        });
    })
    
}

export {
    insertBehaviorInstance,
    searchLatestBehavior
}