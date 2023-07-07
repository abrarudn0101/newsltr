// const express = require("express")
// const bodyParser = require("body-parser")
// const app = express()


// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static('public'))
// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/signup.html")
// })
// app.post("/",function(req,res){
//     var firstName=req.body.firstname
//     var lastName=req.body.lastname
//     var email=req.body.email
//     console.log(firstName,lastName,email)
//     res.sendFile(__dirname+"/success.html")
// })






// app.listen(3000,function(){
//     console.log("sucessfully working on port 3000")
// })


const express = require("express");
const bodyParser = require("body-parser");
const Mailchimp = require("mailchimp-api-v3");

const app = express();
const mailchimp = new Mailchimp("185c29b09b3c71f107df037f41a06ace-us10"); // Replace with your Mailchimp API key

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

    var subscriber = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    };

    mailchimp.post("/lists/2a2092ed6d/members", subscriber) 
        .then(function (response) {
            console.log("Successfully added subscriber to Mailchimp:", response);
            res.sendFile(__dirname + "/success.html");
        })
        .catch(function (error) {
            console.error("Error adding subscriber to Mailchimp:", error);
            res.sendFile(__dirname + "/failure.html");
        });
});

app.listen(process.env.PORT ||3000, function () {
    console.log("Successfully working on port 3000");
});










// 185c29b09b3c71f107df037f41a06ace-us10
// 2a2092ed6d