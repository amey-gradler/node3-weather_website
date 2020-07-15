const path=require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

const app=express()

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//define paths for express config
const publicDir_Path=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../template/views');
const partialsPath=path.join(__dirname,'../template/partials')

// setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDir_Path))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather ',
        name:'Ameya Ganore'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About',
        name:'Ameya Ganore'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'How May I help You',
        name:'Ameya Ganore'
    })
})




app.get('/Weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            Error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,Location}={}) => {
    
        if(error){
          return res.send({
              Error:error
          })
        }
        
        forecast(latitude,longitude, (error, forecast_data) => {
          if (error){
            return res.send({
                Error:error
            })
          }
          
          res.send({
              location:Location,
              forecast:forecast_data,
              address:req.query.address
          })
          
        })
    
    })
    // res.send([{
    //     location:"Nashik",
    //     forcast:"Overhead",
    //     address:req.query.address
    // }
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Ameya',
        errorMessage:'Help Article Not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Ameya',
        errorMessage:'Page Not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000');
    
})