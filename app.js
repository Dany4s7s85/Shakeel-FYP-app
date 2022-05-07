const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var path = require("path");
app.use(cookieParser());
dotenv.config({ path: "./.env" });
const Castvot = require("./votercastvot");
const NewVote = require("./AddVoter");
const CandidateAdd = require("./AddCandidate");
const AllCandidate = require("./dbcandidate");
const Allvoters = require("./allvoters");
const MatchCNIC = require("./CheckCNIC");
const Deletecandidate = require("./Deletecandidate");
const Deletevoter = require("./Deletevoter");

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());

// get last document of database
app.post("/votcast", Castvot);

// all database documentation
app.get("/allcandidate", AllCandidate);

// get last document of database
app.post("/addvoter", NewVote);

// get last document of database
app.post("/addcandidate", CandidateAdd);

// there is update application status
app.post("/check", MatchCNIC);

// delete student application
app.post("/deletecandidate", Deletecandidate);

// delete student application
app.post("/deletevoter", Deletevoter);

// find one doc and show student mean applicant
app.get("/allvoters", Allvoters);

//this is for heroku don,t touch
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function () {
  console.log("listen port 5000");
});
