const {candidate} = require("./dbConn");
async function CandidateAdd(req, res){
    const {cname, cgender, ccnic, cparty, cdistrict} = req.body;

   const CNIC_id = ccnic;
   const partname = cparty

  const dbcnic = await candidate.findOne({ccnic:CNIC_id})
  const dbparty = await candidate.findOne({cparty:partname})
  if (!cname || !cgender || !ccnic || !cdistrict || !cparty) {
    res.end("all fields required");
  }if(dbcnic){
    res.end("Candidate already exist")
  }if(dbparty){
    res.end("Party already Added")
  } else {
    const NowCandidate = new candidate(req.body);
    NowCandidate.save();
    res.end();
    };
}

module.exports = CandidateAdd