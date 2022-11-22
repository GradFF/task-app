import express from 'express'
import cors from 'cors'

import tasksRouter from './routers/task-router'

const PORT = process.env.PORT || 3333

const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: ['http://localhost:3000']
}))

app.use('/api', tasksRouter)

app.get('/', (req, res) => {
  res.send('Bem vindo')
})

app.use((req, res) => {
  res.status(404)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
