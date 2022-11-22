import express from 'express'

const tasksRouter = express.Router()
import Task from '../models/task'
import tasksRepository from '../repositories/itens-repository'

// Create
tasksRouter.post('/tasks', (req, res) => {
  const task: Task = req.body

  tasksRepository.create(task, (id) => {
    if (id) {
      res.status(201).location(`/tasks/${id}`).send()
    } else {
      res.status(400).send()
    }
  })

})
// Read
tasksRouter.get('/tasks', (req, res) => {
  tasksRepository.fetch((tasks) => res.json(tasks))
})

// Read one
tasksRouter.get('/tasks/:id', (req, res) => {
  const id: number = +req.params.id
  tasksRepository.find(id, (task) => {
    if (task) {
      res.json(task)
    } else {
      res.status(404).send()
    }
  })
})
// Update
tasksRouter.put('/tasks/:id', (req, res) => {
  const id: number = +req.params.id

  tasksRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  })
})
// Delete
tasksRouter.delete('/tasks/:id', (req, res) => {
  const id: number = +req.params.id
  tasksRepository.remove(id, (notFound) => {
    if (notFound) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  })
})

export default tasksRouter
