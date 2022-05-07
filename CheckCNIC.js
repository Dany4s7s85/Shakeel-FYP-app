const {voter} = require("./dbConn");

function MatchCNIC(req, res) {
  const id = req.body.cnic;
  if(!id){
    res.end("CNIC required")
  }else{
    voter
    .findOne({ cnic: id })
    .then((data) => {
      if(data){
        if(data.vot){
          res.end("You are voted already")
        }else{
          res.end("true")
        }
        
      }else{
        res.end("You are not registered in the voting list")
      }
    })
    .catch((err)=>{
      res.end("You are not registered in the voting list")
    });
  }
  
}

module.exports = MatchCNIC;
