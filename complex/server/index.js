const keys = require("./keys");
// Express APP setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Setup
const {Pool} = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', () => console.log(' Lost PG connection'));

// Create table for all values that will be submited to the database
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
.catch((err) => console.log(err));
//  Redis client setup

const redis = require("redis");
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

app.get('/',(req,res) => {
    res.send("hi");
});

app.get('/values/all', async (req,res) => {
    const values = await pgClient.query('SELECT * from values');
    res.send(values.rows);
});

app.get('/values/current', async (req,res) => {
    redisClient.hgetall('values',(err,values)=>{
        res.send(values);
    });
});

app.post('/values', async(req,res) => {
    const index = req.body.index;
    if(parseInt(index) > 40){
        return res.status(422).send('Index too high');

    }
    // No value assigned yet
    redisClient.hset('values',index,'nothing yet')
    redisPublisher.publish('insert',index);
    // Submit index to PQ
    pgClient.query('INSERT INTO values(number) values($1)',[index]);
    // 
    res.send({working : true});

})

app.listen(5000,err => {
    console.log("Listerning")
})