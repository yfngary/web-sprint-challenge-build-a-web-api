// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({message: "That id doesn't exist"})
        } else {
            req.action = action
            next()
        }
    } catch (err){
        res.status(404)
    }
}

function validateAction(req, res, next) {
    const { notes, description, project_id } = req.body
    if((!notes || !description) || !project_id) {
        res.status(400).json({
            message: "You will need notes, a description, and a project id"
        })
    } else {
        req.action = { notes, description, project_id }
        next()
    } 
}

module.exports = {
    validateActionId,
    validateAction
}