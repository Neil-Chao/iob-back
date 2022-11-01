const neo4j = require('neo4j-driver')

let driver = neo4j.driver(
    "bolt://localhost",
    neo4j.auth.basic('neo4j', 'Zhao991208')
)

export default driver