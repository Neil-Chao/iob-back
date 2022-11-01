import driver from "../../public/neo4j_session"

async function insertBehaviorInstance(fields, values) {
    const session = driver.session()
    let attributes = {}
    fields.forEach((value, index) => {
        attributes[value] = values[index]
    })
    const query = 'MERGE (alice:Person {name : $nameParam}) RETURN alice.name AS name';

    return new Promise((resolve, reject) => {
        session
        .run(query, values, (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            } else {
                resolve(result)
            }
        })
    })
}