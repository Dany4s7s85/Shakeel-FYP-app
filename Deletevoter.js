const {voter} = require("./dbConn");

function Deletevoter(req, res){
    const id = req.body.id;
    voter.findOneAndDelete({ cnic: id }, (error, data) => {
  
      if (error) {
        console.log("error occured");
      } else {
        res.end();
      }
    });
}

module.exports = Deletevoter;