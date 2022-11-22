import Task from '../models/task'
import database from './database'

const tasksRepository = {
  create: (task: Task, callback: (id?: number) => void) => {

    const sql = `INSERT INTO tasks (content, done, createdAt) VALUES (?, ?, ?)`

    const params = [task.content, task.done, new Date().toDateString()]
    database.run(sql, params, function (_err) {
      callback(this?.lastID)
    })
  },

  fetch: (callback: (tasks: Task[]) => void) => {
    const sql = 'SELECT * FROM tasks'
    const params: any[] = []
    database.all(sql, params, (_err, rows) => callback(rows))
  },

  find: (id: number, callback: (task?: Task) => void) => {
    const sql = 'SELECT * FROM tasks WHERE id = ?'
    database.get(sql, [id], (_err, row) => callback(row))
  },

  update: (id: number, task: Task, callback: (notFound: boolean) => void) => {
    const sql = 'UPDATE tasks SET content = ?, done = ?, createdAt = ? WHERE id = ?'
    const params = [task.content, task.done, task.createdAt, id]
    database.run(sql, params, function (_err) {
      callback(this.changes === 0)
    })
  },

  remove: (id: number, callback: (notFound: boolean) => void) => {
    const sql = 'DELETE FROM tasks WHERE id = ?'
    database.run(sql, [id], function (_err) {
      callback(this.changes === 0)
    })
  },
}

export default tasksRepository