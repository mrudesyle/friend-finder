var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


// Sets up the Express app to handle data parsing
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// =============================================================

// set up empty array to push survey submissions to
var submissions = [
    {
        name: "Sponge Bob",
        photo: "http://4.bp.blogspot.com/_DcuXS5Y6cJ4/S8k-NPVEfmI/AAAAAAAAADk/wiGasQum7J8/s1600/gangsta_spongebob_pic.jpg",
        scores: [
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1",
            "1"
        ]
    }
];

// =============================================================

// routes
// =============================================================
//route for home/index.html 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/index.html"));
});

//route for survey
app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname + "/app/public/survey.html"));
})

//route to GET /api/friends data
app.get("/api/friends", function (req, res) {
    return res.json(submissions);
})

// route to POST /api/friends data
//route to GET /api/friends data
app.post("/api/friends", function (req, res) {

    var friendMatch = {
        name: "",
        photo: "",
        friendDifference: 1000
    };

    console.log(req.body);

    // Parses results of survey
    var userData = req.body;
    var userScores = userData.scores;

    console.log(userScores);

    var diff = 0;

    //Loops through friends
    for (var i = 0; i < submissions.length; i++) {
        console.log(submissions[i]);
        diff = 0;

        // Loops to match scores
        for (var j = 0; i < submissions[i].scores[j]; j++) {

            // Calculates difference between scores and total
            diff += Math.abs(parseInt(userScores[j]) - parseInt(submissions[i].scores[j]));

            // Finds best match
            if (diff <= friendMatch.friendDifference) {

                friendMatch.name = submissions[i].name;
                friendMatch.photo = submissions[i].photo;
                friendMatch.friendDifference = diff;

            };

        };


    };

    submissions.push(userData);

    res.json(friendMatch);

});
// =============================================================


// Start the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
})
