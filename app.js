//jshint esversion :6

const express= require("express");

const bodyParser= require("body-parser");

const request= require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;

    const data = {
        members : [
            {
             email_address:email,
             status:"subscribed",
             merge_fields:{
                 FNAME:firstname,
                 LNAME:lastname
             }

            }
        ]
    };

const jsondata= JSON.stringify(data);

const url=" https://us6.api.mailchimp.com/3.0/lists/9528944de0";

const options={
    method:"POST",
    auth:"bhanu:7e17f9bf07342f12b0af286badb2332b-us6"
}

const request =https.request(url,options,function(response){

    if(response.statusCode===200){
    res.sendFile(__dirname + "/sucess.html");
    }
    else{
    res.sendFile(__dirname + "/failure.html");

    }





    response.on("data",function(data){
        console.log(JSON.parse(data))
    })
})

request.write(jsondata);
request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 8080, function(){
console.log("server is running on port 8080");
});


