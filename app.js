const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request"); 
const app = express();
const https = require("https");
const { fileLoader } = require("ejs");
const PORT = process.env.PORT || 3030;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res){
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);
   
   let url = "https://us13.api.mailchimp.com/3.0/lists/6ff157c8a1";
   let option = {
    method:"POST",
    auth:"shubham1:5cd6e42331b779c9976390d5deac0b3a-us13"
   };
   const request = https.request(url, option, function(response){ 
    if (response.statusCode===200){
        res.sendFile(__dirname + "/success.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    };
    response.on("data", function(data){
        console.log(JSON.parse(data));

       });
   });
   
   
   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")

});


app.listen (PORT, function (){
    console.log ("server is live");
});





