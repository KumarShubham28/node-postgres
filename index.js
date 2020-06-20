const express = require('express')
const pool = require('./queries.js')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/users', (req, res) =>{
    const {username, password}= req.body   
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, password], (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`User added with row number: ${results.rows[0].id}`)
      })                                          
})
app.delete('/users/:id', (req, res) => {
    const _id = parseInt(req.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [_id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User deleted with ID: ${_id}`)
      })
})
app.put('/users/:id', (req, res) => {
    const _id = parseInt(req.params.id)
    const { username } = req.body

    pool.query(
        'UPDATE users SET username = $1 WHERE id = $2',
        [username, _id],
        (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`User modified with ID: ${_id}`)
        }
      )
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
