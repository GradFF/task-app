import  sqlite3  from "sqlite3";

const DBSOURCE  = 'db.sqlite'

const SQL_ITEMS_CREATE = `CREATE TABLE tasks (
  	id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    done INTEGER,
    createdAt TEXT
)`

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Base de dados conectada com sucesso.');
    database.run(SQL_ITEMS_CREATE, (err) => {
      if (err) {
        
      } else {
        console.log('Tabela Task criada com sucesso');
        
      }
    })
    
  }
})

export default database