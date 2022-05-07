import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./Nav";
function VotCast() {
  const history = useHistory();
  var [togle, settogle] = useState("false");
  var [response, setresponse] = useState("");
  var [candidates, setcandidates] = useState([]);
  var [FormData, setFormData] = useState({cnic: "", vot:""});
  
  function GetValue(e) {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...FormData, [name]: value });
  }

  function SendForm(event) {
    event.preventDefault();
    axios
      .post("/check", FormData)
      .then((res) => {
        console.log(res.data)
        if (res.data === true) {
          settogle("true")
        } else {
          setresponse(res.data);
        }
      })
      .catch();
  }

  function GetId() {
    axios
      .get("/allcandidate")
      .then((res) => {
        setcandidates(res.data)
      })
      .catch();
  }
  useEffect(() => {
    GetId();
  },[]);


  function countparties(data){
      return(
        <>
          <option>{data.cparty}</option>
        </>
      )
  }

  function DisplayParties(partydata){
    return(
      <div>
        <h3>{partydata.cname}</h3>
        <p>{partydata.cdistrict}</p>
        <p>{partydata.cparty}</p>
      </div>
    )
  }

  function VotTo(){
    axios
      .post("/votcast", FormData)
      .then((res) => {
        window.location.reload(true)
      })
      .catch();
  }

  if(togle === "true"){
    return(
    <div>
    <NavBar />
    <div className="Maindivdiscandidates">
      {candidates.map(DisplayParties)}
      </div>
      <div className="votCastMainDiv">
      <div>
      <p className="text-success">Select your favourit party and vot. be carefull you have only one chance system not allowed you to vot again</p>
      <select
      onChange={GetValue}
      name="vot"
      >
      <option>Select One</option>
      {candidates.map(countparties)}
      </select>
      <button onClick={VotTo}>Cast Vote</button>
      </div>
      </div>
      
      
    </div>
    )
  }else{
  return (
    <div>
      <NavBar />
      <div className="FormMainDiv">
        <div>
          <form>
            Enter CNIC(no "-"):
            <input
              placeholder="Enter CNIC"
              onChange={GetValue}
              name="cnic"
            />
          
            <p className="text-danger">{response}</p>
            <button onClick={SendForm}>Check CNIC</button>
          </form>
        </div>
      </div>
    </div>
  );
}
}

export default VotCast;
