const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')




console.log(__dirname)
const publicDirectoryPath = path.join(__dirname,"../public")

console.log(publicDirectoryPath)
const app = express()

app.set('view engine','hbs')

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{title:'Weather app',name:'Rahul Tej'})  
})

const viewsPath = path.join(__dirname,"../templates/views")
const patialsPath = path.join(__dirname,"../templates/partials")
app.set('views',viewsPath)

hbs.registerPartials(patialsPath)
/*

app.get('/',(req,res)=>{
    res.render('index',{root:viewsPath, title:'Weather app',name:'Rahul Tej'})  
})
*/
app.get('/about',(req,res)=>{
    res.render('about',{title:'About me',name:'Rahul Tej'})  
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
    title:'Help',
    name:'Rahul Tej'})  
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help page not found',
    title:'Help',
    name:'Rahul Tej'})  
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({Error :"address missing"}); 
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
    
        }else{

            forecast(latitude,longitude,(error,weather_responseData)=>{
                if(error){
                    return res.send({error});       
                }else{

                    return res.send({
                        forecast : weather_responseData,
                        location,
                        address: req.query.address});
                }
    
            });
    
        }
    });

})


app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found',
    title:'help',
    name:'Rahul Tej'})  
})

app.listen(3000,()=>{console.log("Server started")})