import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoutes from './app/modules/user/user.route'

const app: Application = express()
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/users/', userRoutes)

// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Working successfully!')
})

export default app
