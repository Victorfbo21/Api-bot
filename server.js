const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.listen(port);
console.log(`Ouvindo na porta ${port}`)

mongoose.connect(process.env.MONGO_URL);


app.get('/users', (req,res)=>{
    res.json({id:1})
})

app.post('/', (req, res) => {
    var body = req.body;
    if (!body || !body.clientid) return;
    res.send('Got a POST request')
})

app.post('/newUser', (req,res) =>{
    
    if(req.body.user == process.env.USER && req.body.password == process.env.PASSWORD){
        return res.end()
    }
    
    console.log(token);
    req.json(token);
})

