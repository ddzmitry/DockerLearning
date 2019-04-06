const express = require('express');
const app = express();
app.get('/', (req,res) => {
    res.send("<h1>POOP HERE TOO</h1>")
});

app.listen(8080, () => {
    console.log(`Listerinig on port 8080`)
});