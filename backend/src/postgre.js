const {Pool}= require('pg');

const pool=new Pool({
    user: 'postgres',
    password: 'Jr@mirez4912',
    host: 'localhost',
    port: 5432,
    database: 'TuEnvioAdmon' 
})

module.exports= pool;