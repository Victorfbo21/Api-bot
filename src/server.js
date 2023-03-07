import express from 'express'
import Routers from './Routes/index.js'
import { config } from 'dotenv'
import dbConnect from './Config/dbConfig.js'
import userContextInstance from './Utils/UserContext.js'
import ScheduleManager from './Utils/ScheduleManager.js'
import cors from 'cors'
config({
  path: '.env'
})
const app = express()
const port = process.env.PORT || 8080
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.originalUrl, ' Time:', new Date().toUTCString())
  userContextInstance.destroy()
  next()
})
app.use(cors())

app.use(Routers)

dbConnect().then(r => {
  app.listen(port, (req, res) => {
    ScheduleManager.createScheduleTimer()
    console.log(`Ouvindo em http://localhost:${port}`)
  })
}).catch(err => console.error('Error on db connect', err))
