import NavBar from "./Nav";
import axios from "axios";
import {useEffect, useState} from "react"

function Result(){
    const [allcandidates, setallcandidate] = useState([])
    const [allvoters, setallvoters] = useState([])

    function Votersdata() {
        axios
          .get("/allcandidate")
          .then((response) => {
            const alldata = response.data;
            setallcandidate(alldata)
          })
          .catch(() => {
            console.log("error occured");
          });
      }

      function Candidatedata() {
        axios
          .get("/allvoters")
          .then((response) => {
            const alldata = response.data;
            setallvoters(alldata)
          })
          .catch(() => {
            console.log("error occured");
          });
      }
    
      useEffect(() => {
        Candidatedata();
        Votersdata();
      }, []);
    

      let votresult = [];
      function candidatesCount(data){
        let name = data.cname;
        let district = data.cdistrict;
        let party = data.cparty;
        let vot = 0;
        for(let i=0; i<allvoters.length; i++){
          if(allvoters[i].vot === data.cparty){
            vot++;
          } 
        }
        const oneresult = {name, district, party, vot}
        votresult.push(oneresult)
      }

      function finalresult(redata){
        return(
          <div>
            <h3>Chairman: {redata.name}</h3>
            <p>Party: {redata.party}</p>
            <p>District: {redata.district}</p>
            <p>Vot: {redata.vot}</p>
          </div>
        )
      }
      

    return(
        <div>
    <NavBar />
         <div className="ResultMainDiv">
          {allcandidates.map(candidatesCount)}
          {votresult.map(finalresult)}
        </div>
        </div>
    )
}

export default Result;