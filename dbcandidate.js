const {candidate} = require("./dbConn");

function AllCandidate(req, res) {
  candidate
    .find()
    .then((data) => {
      res.write(JSON.stringify(data));
      res.end();
    })
    .catch();
}

module.exports = AllCandidate;
