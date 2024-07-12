const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const appID = "6f97649b7d04ee2e1f461bc746cd575d";
  const unit = "metric";
  const query = req.body.cityName;
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+appID+"&units="+unit+"";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData= JSON.parse(data)
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      const weatherDescription = weatherData.weather[0].description
      res.write("<h1>the temprature in "+query+" is  "+temp+" degree Celcius</h1>")
      res.write("<p>The weather is currently "+weatherDescription+"</p>")
      res.write("<img src =" +iconUrl+">")
      res.send();
    });

  });
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started");
})
