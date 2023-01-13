// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')
const { validateActionId, validateAction } = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) =>{
    res.json(req.action)
} )

router.post('/', validateAction, async (req, res, next) => {
    try {
        const action = await Actions.insert({
            project_id: req.action.project_id,
            description: req.action.description,
            notes: req.action.notes
        })
    res.status(201).json(action)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router