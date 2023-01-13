// Write your "projects" router here!
const express = require('express');
const router = express.Router()
const Project = require('./projects-model')
const { validateProjectId, validateProject } = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)

})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            console.log(project)
            res.status(201).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    const deleteP = await Project.get(req.params.id)
    Project.remove(req.params.id)
        .then(project => {
            // console.log(project)
            res.status(200).json(deleteP)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            console.log(actions)
            res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router

