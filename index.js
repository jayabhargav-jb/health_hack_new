const express =require('express');
const multer=require('multer')
const bodyParser = require('body-parser')

//const fileUpload = require('express-fileupload');
const fs = require('fs')
const port=3000;
const ip = '172.16.128.90'
const url = "http://172.16.128.90:3000/postQ"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, 'uploads');  
    },  
    filename: function (req, file, callback) {  
      console.log(file)
      callback(null, file.originalname);  
    }  
  });  
let upload = multer({ storage : storage});   
app.use(express.static('public'))
//app.use(fileUpload())
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home.ejs',{url})
})
app.get('/output',(req,res)=>{
    console.log(req)
    res.send({God:'Sameer',Ayyt:'Rajath'})
    //res.sendStatus(200)
})
app.post("/postImg",upload.single('image'),
  (req, res) => {
    
    console.log('Hi')
    try {
    console.log(req.body)
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });


app.post('/postQ',(req,res)=>{
  const jsonData = req.body;
  const filename = 'data.json'
  const jsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFile(filename, jsonString, (err) => {
    if (err) {
        console.error('Error writing JSON to file:', err);
        res.status(500).send('Error writing JSON to file');
        return;
    }
    console.log('JSON data has been written to', filename);
    res.status(200).send('JSON data has been written to file');
});
    
}) 
app.listen(port,ip,()=>{
    console.log(`connected to the port ${port}`)
})
