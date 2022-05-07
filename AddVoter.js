const {voter} = require("./dbConn");

async function NewVote(req, res) {
  const {name, gender, cnic, district} = req.body;
   const CNIC_id = cnic

  const dbcnic = await voter.findOne({cnic:CNIC_id})
  if (!name || !gender || !cnic || !district) {
    res.end("all fields required");
  }if(dbcnic){
    res.end("Voter already exist")
  } else {
    const NowVot = new voter(req.body);
    NowVot.save();
    res.end();
    };
}

module.exports = NewVote;
