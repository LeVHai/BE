import express from 'express'
import databaseService from './services/databaseService.js'
import { config } from 'dotenv'
import usersRouter from './routes/usersRoutes.js'
config()
const app = express()
const port = 4000
app.use(express.json())
databaseService.connect()
app.use('/users', usersRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})