require("dotenv").config() // Cargar env variables del archivo .env

const config = {
    port:process.env.PORT,
    mongoDB_CNN:process.env.MONGODB_CNN,
    secretKey:process.env.SECRET_KEY
}

module.exports = config