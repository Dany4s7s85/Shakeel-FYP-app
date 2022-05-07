import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "./Nav";
import axios from "axios";

function Admin() {
  const history = useHistory()
  var [togle, settogle] = useState("false");
  const [adminid, setadminid] = useState({ id: "" });
  const [dbdata, setdbdata] = useState([]);
  const [message, Setmessage] = useState("");
  var [response, setresponse] = useState("");
  var [cresponse, setcresponse] = useState("");

  var [Voter, setVoter] = useState({
    name: "",
    gender: "",
    cnic: "",
    district: "",
    vot:"",
  });

  var [Candidate, setCandidate] = useState({
    cname: "",
    cgender: "",
    ccnic: "",
    cparty: "",
    cdistrict: "",
  });

  function GetVoter(e) {
    const value = e.target.value;
    const name = e.target.name;
    setVoter({ ...Voter, [name]: value });
  }

  function GetCandidate(e) {
    const value = e.target.value;
    const name = e.target.name;
    setCandidate({ ...Candidate, [name]: value });
  }

  function SendVoter(event) {
    event.preventDefault();
    axios
      .post("/addvoter", Voter)
      .then((res) => {
        if (res.data) {
          
            setresponse(res.data)
          }else{
            window.alert("Voter add successfully")
            history.push("/votdetail")
          }
      })
      .catch();
  }

  function SendCandidate(event) {
    event.preventDefault();
    axios
      .post("/addcandidate", Candidate)
      .then((res) => {
        if (res.data) {
          setcresponse(res.data);
        } else {
          window.alert("Candidate add successfully")
          history.push("/candidate")
        }
      })
      .catch();
  }

  function SetId(e) {
    const name = e.target.name;
    const value = e.target.value;
    setadminid({ ...adminid, [name]: value });
  }

  function CheckAdminID() {
 
    if (adminid.id === "Shakeel777") {
      settogle("true");
    }else{
      Setmessage("Invalid ID")
    }
  }

  function UpdateStatus() {
    axios
      .post("/update")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log("server error");
      });
  }

  function DeleteApplication() {
    axios
      .post("/delete")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log("server error");
      });
  }

  function GetdbData() {
    axios
      .get("/fetchdb")
      .then((res) => {
        setdbdata(res.data);
      })
      .catch();
  }
  useEffect(() => {
    GetdbData();
  }, []);

  

  if (togle === "true") {
    return (
      <div>
      <NavBar />
      <div className="FormMainDiv">
        <div>
          <form>
            Voter Name:
            <input placeholder="Voter Name" onChange={GetVoter} name="name" value={Voter.name}/>
            District:
            <input placeholder="District" onChange={GetVoter} name="district" value={Voter.district}/>
            Gender:
            <select placeholder="Gender" onChange={GetVoter} name="gender" value={Voter.gender}>
              <option>Select  one</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            CNIC(no "-"):
            <input
              placeholder="Enter CNIC"
              onChange={GetVoter}
              name="cnic"
              value={Voter.cnic}
            />
          
            <p className="text-danger">{response}</p>
            <button onClick={SendVoter}>Add Voter</button>
          </form>
      </div>

      <div>
          <form>
            Candidate Name:
            <input placeholder="Name" onChange={GetCandidate} name="cname"/>
            District:
            <input placeholder="District" onChange={GetCandidate} name="cdistrict"/>
            Gender:
            <select placeholder="Gender" onChange={GetCandidate} name="cgender">
              <option>Select  one</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            Enter CNIC(no "-"):
            <input
              placeholder="Enter CNIC"
              onChange={GetCandidate}
              name="ccnic"
            />
            Party Name:
            <input placeholder="party" onChange={GetCandidate} name="cparty" />
            <p className="text-danger">{cresponse}</p>
            <button onClick={SendCandidate}>Add Candidate</button>
          </form>
      </div>
    </div>
    </div>
    );
  } else {
    return (
      <div>
      <NavBar />
        <div className="StatusBodyMainDiv">
          <div>
            <div>
              login for admin
              <input onChange={SetId} placeholder="Enter Your ID" name="id" />
              <p className="text-danger">{message}</p>
              <button onClick={CheckAdminID}>Submit</button>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Admin;
