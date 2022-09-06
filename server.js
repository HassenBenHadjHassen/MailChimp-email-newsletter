const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
}) 

app.post("/", function (req, res) {
    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/b56f77f752"

    const options = {
        method: "POST",
        auth: "Hassen:1957711026ca058a5bd36896788e0052-us9"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            
        })
    })

    request.write(jsonData);


    if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
    request.end();
});


app.post("/failure", function (req,res) {
    res.redirect("/");
});





app.listen(process.env.PORT || 5500, function () {
    console.log("Server has started on port 5500");
});