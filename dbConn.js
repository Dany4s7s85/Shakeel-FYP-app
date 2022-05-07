const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/voting";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

//create schema for Voter
const voterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  cnic: {
    type: String,
  },
  district: {
    type: String,
  },
  vot:{
    type:String,
  }
});
const voter = mongoose.model("votes", voterSchema);

//create schema for Candidate
const CandidateSchema = new mongoose.Schema({
  cname: {
    type: String,
  },
  cgender: {
    type: String,
  },
  ccnic: {
    type: String,
  },
  cdistrict: {
    type: String,
  },
  cparty: {
    type: String,
  },
});

const candidate = mongoose.model("candidates", CandidateSchema);

module.exports = {voter, candidate};
