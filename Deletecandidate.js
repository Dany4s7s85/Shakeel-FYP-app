const {candidate} = require("./dbConn");

function Deletecandidate(req, res) {
  const id = req.body.id;
  candidate.findOneAndDelete({ ccnic: id }, (error, data) => {

    if (error) {
      console.log("error occured");
    } else {
      res.end();
    }
  });
 }

module.exports = Deletecandidate;

