const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');




const app = express();
const port = process.env.PORT || 3000

//define path for express configuration
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,"../templates/partials")

//setup handlebars ending and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name:"umashankar mahto"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About Me',
    name: 'umashankar mahto'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpTxt:'some text for help',
    name:'umashankar mahto'
  })
})
app.get('/weather', (req, res) => {

  if (!req.query.address) return res.send({ error: "you must provide a address!" })
  
  geocode(req.query.address, (error, {location, latitude,longitude}={}) => {

    if (error) return res.send({ error })

    forecast(latitude, longitude, (error, forecastData) => {

      if(error) return res.send({error})
      res.send({
        location,
        forecast: forecastData,
        address:req.query.address,
      })
    })
})

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title:"404",
    error: "Help articals not found!",
    name:'umashankar mahto'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title:"404",
    error: "page not found!",
    name:'umahsankar mahto'
  })
})

app.listen(port, () => {
  console.log(`server up on port ${port}`)
})