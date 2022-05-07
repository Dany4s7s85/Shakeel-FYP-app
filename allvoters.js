const {voter} = require("./dbConn");

function Allvoters(req, res) {
  const id = req.body.id;
  voter
    .find()
    .then((data) => {
      res.write(JSON.stringify(data));
      res.end();
    })
    .catch();
}

module.exports = Allvoters;
