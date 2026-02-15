
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

console.log("MONGO URI:", process.env.MONGO_URI)
console.log("ENV VALUE:", process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/registrations', require('./routes/registrationRoutes'))

app.listen(5000, ()=>console.log("Server running on port 5000"))
