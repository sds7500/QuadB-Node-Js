const express = require('express');
const hbs = require('hbs');
var requests = require('requests');
const path = require('path');

const port=process.env.PORT||8000; 

const app=express();

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../views'))
app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req, res) =>{
    requests(`https://api.wazirx.com/api/v2/tickers`)
    .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const result =  []
        Object.keys(objdata).forEach(key => result.push({
            name: key,
            value: objdata[key]
         }));
        const final_res=result.slice(0,10)
        res.render('index',{
            Product:final_res
        })
    }).on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        
    });
})



app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})