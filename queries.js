const { Pool } = require('pg')
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'kumar_shubham',
  password: '*********',
  port: 5432,
})

module.exports=pool;