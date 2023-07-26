const connectToMongo = require('./dbconfig');
const express = require('express')
var cors = require('cors')


const app = express()
const port = 5000

connectToMongo();

//middleware
app.use(cors())
app.use(express.json())


// Availabel Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening at https://notionx-api.onrender.com/`)
})