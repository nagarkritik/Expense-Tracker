const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const sequelize = require('./util/database')
const userRoutes = require('./routes/userLoginSignup')

const app = express()


app.use(cors())
app.use(bodyParser.json())

app.use(userRoutes)

sequelize.sync()
.then((res)=>{
    //console.log(res)
    app.listen(3000)
}).catch(err=>console.log(err))


