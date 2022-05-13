const JobModel = require("../models/job")

class Jobs {
    async getJobs(filter,search){

        console.log("filter: " + filter + ". search: "+search+".")

        try {

            const busqueda = new RegExp(search, 'i')

            if (filter !== "") {
    
                const filtro = new RegExp(filter, 'i')

                
                const jobs = await JobModel.find({categorys: filtro, name: busqueda})

                return jobs
            }

            const jobs = await JobModel.find({name:busqueda})


            return jobs
        } catch (error) {
            return{
                error:true,
                error
            }
        }
    }

    async createJob(data){
        try {
            const job = await JobModel.create(data)

            return job
        } catch (error) {

            return{
                error:true,
                error
            }

        }
    }

    async updateJob(id,data){
        try{
            const job = await JobModel.findByIdAndUpdate(id,data)
            return job
        } catch(error) {
            return{
                error:true,
                error
            }
        }
    }

    async deleteJob(id){
        try{
            const job = await JobModel.deleteOne(id)
            return job
        } catch(error) {
            return{
                error:true,
                error
            }
        }        
    }

}

module.exports = Jobs