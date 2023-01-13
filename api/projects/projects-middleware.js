// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)  
        if(!project) {
            res.status(404).json({message: "That id doesn't exist"})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(404)
    }
}

function validateProject(req, res, next) {
   const { description, name, completed } = req.body
   console.log('Put request,', req.body);
    if(name && description && completed !== undefined) {
        req.project = { description, name, completed }
       next()
    } else {
        res.status(400).json({
            message: "You will need to have both a name and description for your project"
        })
    }
}

module.exports = {
    validateProjectId,
    validateProject
}