const { config } = require("dotenv")
const express = require("express")

const app = express()
config()
const port = 4000

const {createClient} = require("redis")
const redis = createClient({
    url:"redis://redis:6379"
})

redis.connect().then((res) => console.log("Redis Connected"))
    .catch(e => console.log("Error connecting" + e.message))

const { default: mongoose } = require("mongoose")

mongoose.connect("mongodb://root:example@mongo:27017/")
    .then((db) => console.log("MongoDB Connected "))
    .catch((err) => console.log("error occured" + err))

// const { Client } = require("pg")
// const client = new Client({ connectionString: "postgresql://root:example@postgres:5432" })
// client.connect().then(() => console.log("PostgresDB Connected "))

app.get('/',async (req, res) => {
    redis.set("Name", "Omar")
    res.send("Hello From Docker Tut Env Is " + process.env.NODE_ENV + "😂")
})
app.get('/redis', async (req, res) => res.send(await redis.get("Name")))

app.listen(port, () => console.log('listening on port', port))