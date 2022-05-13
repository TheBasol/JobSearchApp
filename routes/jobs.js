const express = require('express')
const {
    authValidation,
    checkRolePostulant
} = require('../middleware/authValidation')
const JobService = require('../services/jobs')

const router = express.Router()

function jobs(app){

    const jobServ = new JobService()

    app.use("/api/jobs",router)

    router.get("/" ,async (req,res)=>{

        const { filter = "", search = ""}  = req.query;

        const jobs = await jobServ.getJobs(filter,search) // Array de usuarios

        return res.json(jobs)

    })

    router.post("/", [authValidation, checkRolePostulant] ,async (req,res) => {

        const job = await jobServ.createJob(req.body)

        return res.json(job)

    })

    router.put("/:id", [authValidation, checkRolePostulant] ,async(req,res) => {
        const job = await jobServ.updateJob(req.params.id,req.body)
        return res.json(job)
    })

    router.delete("/:id", [authValidation, checkRolePostulant] ,async (req,res)=>{
        try {
            const job = await jobServ.deleteJob({ "_id" : req.params.id})
            return res.json(job)
        } catch (error) {
            return error
        }


    })

}


module.exports = jobs
