const express = require("express")
const { port } = require("./config")
const { connection } = require("./config/db")

//usar las rutas
const users = require("./routes/users")
const auth = require('./routes/auth')
const jobs = require('./routes/jobs')

const app = express()

//trabajar con json
app.use(express.json())

connection()

//usando
users(app)
auth(app)
jobs(app)


app.listen(port,()=>{
    console.log("Listening: http://localhost:"+port)
})