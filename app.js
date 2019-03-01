
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAMAE: firstName,
          LNAME:  lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    // url: "mailchimp url w/list id",
    method: "POST",
    headers: {
      // "Authorization": "userid api key"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
      if (error) {
        res.sendFile(__dirname + "/failure.html");
      }else{
        if (response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
        }else{
          res.sendFile(__dirname + "/failure.html");
        }

      }

  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});


// Run on local port

app.listen(3000, function(){
  console.log("Your on port 3000");
});
