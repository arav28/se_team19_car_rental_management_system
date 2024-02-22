//accessing env variables
require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const morgan = require('morgan')
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handlers")
//connect to MongoDB
const connectDB = require("./db/connect")
const authenticatUser = require("./middleware/authentication")
//middleware to view request details
app.use(morgan("tiny"))
//to access req.body during post request
app.use(express.json())


const auth = require("./routes/login")

app.use("/api/v1/auth",auth)

const cars = require("./routes/cars")
app.use("/api/v1/cars", authenticatUser, cars)



app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("MongoDB is up 🤖")
        app.listen(port,()=>{
            console.log(`server is running at port `+port+` 😁😁🙌`)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()

