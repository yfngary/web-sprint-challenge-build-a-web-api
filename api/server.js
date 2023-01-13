// Configure your server here
const express = require('express');
const server = express();

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)
// server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send('Hello')
})

module.exports = server;
