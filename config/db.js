const mongoose = require('mongoose')
const { mongoDB_CNN } = require("./")

//conexion a la base de datos
const connection = async() => {
    const conn = await mongoose.connect(mongoDB_CNN)
    console.log("Mongo DB connected:", conn.connection.host)
}

module.exports = {connection,mongoose}