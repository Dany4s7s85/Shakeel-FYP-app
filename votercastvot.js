const {voter} = require("./dbConn");

async function Castvot(req, res) {
  const {cnic, vot} = req.body;
  const data = await voter.findOneAndUpdate({cnic:cnic}, {vot:vot})
  res.end();
}

module.exports = Castvot;
