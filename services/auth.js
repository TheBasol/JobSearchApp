const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./users')
const { secretKey } = require("../config")

//crear Un JWT
class Auth{
    async login(data){

        const { email, password } = data
        const userServ = new User()
        const user = await userServ.getByEmail(email)

        if (user && await this.#compare(password,user.password)) {
           return this.#getUserData(user) 
        }

        return{
            error:true,
            msg:"las credenciales son incorrectas"
        }

        
    }

    async signup(data){

        try {
            if (data.password ) {
                data.password = await this.#encrypt(data.password)
            }

            const userServ = new User()
            const user = await userServ.create(data)

            if(user.error){
                return user
            }

            return this.#getUserData(user)            
        } catch (error) {
            return {
                msg: "Hubo un error",
                error: true
            }
        }


    }

    #getUserData(user){

        console.log(user)
        
        const userData = {
            name: user.name,
            email:user.email,
            role: user.role,
            id: user.id
        }

        const token = this.#createToken(userData)
        return {
            user: userData,
            token
        }
    }

    //con esto se hace una funcion privada
    #createToken(payload){
        const token = jwt.sign(payload,secretKey,{
            expiresIn:"7d"
        })
        return token
    }

    //encriptar 
    async #encrypt(string){

        try {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)

            return hash            
        } catch (error) {
            console.log(error)
        }

    }

    async #compare(string,hash){
        return await bcrypt.compare(string,hash)
    }
}

module.exports = Auth;