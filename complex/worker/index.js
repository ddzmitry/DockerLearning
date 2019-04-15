
const keys = require("./keys");
const redis = redis("redis");

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const sub =redisClient.duplicate();

// funciton calculcate FIB 

function fib(index) {
    if (index <= 1) return 1;
    return fib(index - 1) + fib(index - 2);
  };

sub.on('message',(channel,message)=>{
    redisClient.hset('values',message,fib(parseInt(message)));
});

sub.subscribe('insert');