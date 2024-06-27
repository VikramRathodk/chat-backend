const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./register');
const { PORT } = require('./config');
const { connectToDatabase } = require('./db');

const app = express();
app.use(bodyParser.json());

connectToDatabase().catch(console.dir);

app.use('/register', registerRoute);

app.get('/get_users',(req,res)=>{
    res.send("getting all users...");
})

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
