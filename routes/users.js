const express = require('express')
const {
    authValidation,
    adminValidation,
    bothValidations
} = require('../middleware/authValidation')
const UserService  = require('../services/users')


function users(app){
    const router = express.Router()
    const userServ = new UserService()

    app.use("/api/users",router)

    router.get("/", [authValidation,adminValidation] ,async (req,res)=>{

        const user = req.user

        if(user.role === "admin"){
            const users = await userServ.getAll() // Array de usuarios

            return res.json(users)
        }
    })

    router.get("/:email", async (req,res)=>{

        const email = req.params.email

        const user = await userServ.getByEmail(email)
        console.log(user)

        return res.json(user)
    })

    router.post("/" ,async (req,res)=>{
        const user = await userServ.create(req.body)

        return res.json(user)
    })

    router.put("/:id", [authValidation,bothValidations] ,async (req,res)=>{
        const user = await userServ.update(req.params.id,req.body)
        return res.json(user)
    })
    router.delete("/:id",[authValidation,bothValidations] ,async (req,res)=>{
        try {
            const user = await userServ.delete({ "_id" : req.params.id})
            return res.json(user)
        } catch (error) {
            return error
        }


    })
}


module.exports = users
