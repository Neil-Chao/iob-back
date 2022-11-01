const neo4j = require('neo4j-driver')

let driver = neo4j.driver(
    // 'neo4j://0.0.0.0',
    "bolt://localhost",
    neo4j.auth.basic('neo4j', 'Zhao991208')
)

let session = driver.session()

session
    .run('MERGE (alice:Person {name : $nameParam}) RETURN alice.name AS name', {
        nameParam: 'Alice'
    })
    .subscribe({
        onKeys: keys => {
            console.log(1)
            console.log(keys)
        },
        onNext: record => {
            console.log(2)
            console.log(record.get("name"))
        },
        onCompleted: () => {
            console.log(3)
            session.close() // returns a Promise
            driver.close()
        },
        onError: error => {
            console.log(4)
            console.log(error)
            session.close()
            driver.close()
        }
    })



