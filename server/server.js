const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
let loggedIn=true;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    res.json({"users":['user 1', 'user 2','user 3','user 4']})
});
const meetingList = []


app.post('/addmeeting',(req,res)=>{
    const data = req.body['formData'];
    
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    jsonData.push(data)
    
    fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });

loggedIn=true;
  res.send(jsonData)
})

app.post('/remove',(req,res)=>{
    const data = req.body;
    console.log(data)
   
    const jsonData = data.reduce((accumulator, currentValue, index) => {
        accumulator[index] = currentValue;
        return accumulator;
      }, []);

    fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
    if (err) throw err;
   
  });

loggedIn=true;


  res.send(jsonData)
})




app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Verify the username and password
  if (username === 'admin@example.com' && password === 'password') {
    loggedIn =true;
    res.sendStatus(200);
   
  } else {
    res.sendStatus(401);
  }
});

app.get('/api/authenticate',(req,res)=> {
    if(loggedIn==true)
    {
        const jsonData = JSON.parse(fs.readFileSync('data.json'));
        res.send(jsonData)
    }
    else{
        res.sendStatus(401)
    }
})

app.post('/logout',(req,res)=> {
    loggedIn = false;
    res.sendStatus(200)
})

app.listen(5000,() =>{console.log("server running on port 5000")});