const jwt = require('jsonwebtoken')

function authValidation(req,res,next){
    const bearer = req.headers.authorization

    if (
        bearer &&
        bearer.startsWith('Bearer')
    ){
        // const split = bearer.split("Bearer ")

        // const token = split[1]
        const [,token] = bearer.split("Bearer ") //Destructuring

        if(token){
            try{
                const decoded = jwt.verify(token,"12345")

                req.user = decoded

                return next()
 
            }catch({message,name}){
                // const message = error.message
                // const name = error.name
                return res.status(403).json({
                    error:true,
                    message,
                    type:name
                })
            }
            
        }
    }

    return res.status(403).json({
        error:true,
        message:"Permisos insuficiones - debes tener un token"
    })
}

function adminValidation(req,res,next){

    const { role, name } = req.user;

    if (role !== 'admin') {
        return res.status(401).json({
            msg: name + " no es administrador - no puede hacer esto"
        })
    } 

    next()
}

function employerValidation(req,res,next){

    const { role, name } = req.user;

    if (role !== 'empleador') {
        return res.status(401).json({
            msg: name + " no es empleador - no puede hacer esto"
        })
    } 

    next()
}

function bothValidations(req,res,next){
    const { role, name, id } = req.user;

    if (role !== 'admin') {

        if (req.params.id !== id) {
            return res.status(401).json({
                msg: name + " solo los administradores pueden modificar otras cuentas"
            })
        }
    }

    next()
}

function checkRoleAdmin(req,res,next){
    const { role } = req.body

    if (role === "admin") {
        return res.status(401).json({
            msg: "solo los administradores pueden crear otro administrador"
        })
    }

    next()
}

function checkRolePostulant(req,res,next){

    const { role, name } = req.user;

    if (role === 'postulante') {
        return res.status(401).json({
            msg: name + " no puede hacer esto"
        })
    } 

    next()
}

module.exports = {
    authValidation,
    adminValidation,
    checkRolePostulant,
    employerValidation,
    bothValidations,
    checkRoleAdmin
}