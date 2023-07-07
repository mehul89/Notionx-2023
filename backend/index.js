const connectToMongo = require('./dbconfig');
const express = require('express')

const app = express()
const port = 5000

connectToMongo();

//middleware
app.use(express.json()) 


// Availabel Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})