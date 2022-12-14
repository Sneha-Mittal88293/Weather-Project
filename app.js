const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function (req , res){

     res.sendFile(__dirname + "/index.html");

  });

  app.post("/" , function(req , res){
       const query = req.body.cityName;
     const apiKey = "734b3d317bd733028f2b25180b0d949d";
     const unit = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+"&appid="+apiKey+"&units=" +unit;
     https.get(url , function(response){
          console.log(response.statusCode);

          response.on("data" , function(data){
               const weatherData = JSON.parse(data);
               const temp  = weatherData.main.temp;
               const weatherDescription  = weatherData.weather[0].description;
               const icon = weatherData.weather[0].icon;
               const imageUrl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
//                // in that way we send multiple item  
               // res.send("<p>The weather is currently " + weatherDescription+ " </p>\n"+" <h1>The temp of landon is " + temp + " degree celsius</h1>");
               
               // or we can send also that way
               res.write("<p>The weather is currently " + weatherDescription+ " </p>");
               res.write("<h1>The temp of " +query+" is"  + temp + " degree celsius</h1>");
               res.write("<img src =" +imageUrl +">");
               res.send();

          });
     });
  });


app.listen(3000 , function(){
     console.log("Server is running on port 3000.");
});