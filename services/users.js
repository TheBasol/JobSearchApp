const UserModel = require('../models/user')

class Users{

    async getAll(){
        try {
            const users = await UserModel.find()

            return users
        } catch (error) {
            console.log(error)
            return error
        }
        
    }

    async create(data){
        try {
            const user = await UserModel.create(data)

            return user
        } catch (error) {
            if(error.code===11000){
                const message = "El correo: "+ error.keyValue.email + " ya esta en uso"
                return{
                    error:true,
                    message
                }
            }
            console.log(error)
        }
    }

    async update(id,data){
        try{
            const user = await UserModel.findByIdAndUpdate(id,data)
            return user
        } catch(error) {
            console.log(error)
        }
    }

    async delete(id){
        try{
            const user = await UserModel.deleteOne(id)
            return user
        } catch(error) {
            console.log(error)
        }        
    }

    async getByEmail(email){
        try {
            const user = await UserModel.findOne({"email": email})
            return user
        } catch (error) {
            console.log(error)
            return error
        }
        
    }

}

module.exports = Users