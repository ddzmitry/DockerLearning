const express = require("express");
const redis = require("redis");
const process = require("process")
const app = express();
const client = redis.createClient({
    // Picked from docker compose 
    host: 'redis-server',
    port: 6379
});
client.set('visits',0);

app.get('/', (req,res) => {
    // process.exit(1);
    client.get('visits', (err,visits) => {
        res.send(`Number of visits is ${visits}`)
        client.set('visits',parseInt(visits) + 1)
    });
});

const PORT = 8081
app.listen(PORT, () => {
    console.log(`Listerninig on port ${PORT}` )
})