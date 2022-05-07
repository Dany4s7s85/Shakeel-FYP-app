import {useEffect, useState} from "react"
import NavBar from "./Nav";
import axios from "axios"

function VotersDetail(){
    const [tabledata, settabledata] = useState([]);
    const [adminid, setadminid] = useState({ id: "" });
    const [ccnic, setccnic] = useState({ id: "" });
    const [response, setresponse] = useState("");
    const [message, Setmessage] = useState("");
    var [togle, settogle] = useState("false");
  
    function Setcnic(e) {
      const name = e.target.name;
      const value = e.target.value;
      setccnic({ ...ccnic, [name]: value });
    }

    function SetId(e) {
        const name = e.target.name;
        const value = e.target.value;
        setadminid({ ...adminid, [name]: value });
      }
  
    function DeleteCandidate(){
      axios
        .post("/deletevoter", ccnic)
        .then((res) => {
          window.location.reload(true)
        })
        .catch((err) => {
          setresponse("oops!: 500 server error");
        });
    }
  
    function ExecuteTable(data) {
      return (
        <tr>
          <td>{data.name}</td>
          <td>{data.gender}</td>
          <td>{data.cnic}</td>
          <td>{data.district}</td>
        </tr>
      );
    }
  
    function getDBdata() {
      axios
        .get("/allvoters")
        .then((response) => {
          const alldata = response.data;
          settabledata(alldata);
        })
        .catch(() => {
          console.log("Server Not Responding");
        });
    }
  
    useEffect(() => {
      getDBdata();
    }, []);

    function CheckAdminID() {
 
        if (adminid.id === "Shakeel777") {
          settogle("true");
        }else{
          Setmessage("Invalid ID")
        }
      }




// display data on page
    if(togle === "true"){
    return(
        <div>
        <NavBar />
        <p className="text-center p-5 text-danger h2">{response}</p>
        <div className="MainDivInputDetial">
          <div>
            <input onChange={Setcnic} placeholder="Enter CNIC" name="id" />
            <button onClick={DeleteCandidate} className="bg-danger">
              Delete Voter
            </button>
          </div>
        </div>
        <div >
          <div>
            <div className="mainDetailBodyDiv">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>CNIC</th>
                  <th>District</th>
                </tr>
                {tabledata.map(ExecuteTable)}
              </table>
            </div>
          </div>
        </div>
      </div>
    )}else{
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

export default VotersDetail