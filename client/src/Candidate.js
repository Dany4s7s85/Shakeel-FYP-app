import {useEffect, useState} from "react"
import NavBar from "./Nav";
import axios from "axios"
function Candidate(){

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
        .post("/deletecandidate", ccnic)
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
          <td>{data.cname}</td>
          <td>{data.cparty}</td>
          <td>{data.ccnic}</td>
          <td>{data.cdistrict}</td>
          <td>{data.cgender}</td>
        </tr>
      );
    }
  
    function getDBdata() {
      axios
        .get("/allcandidate")
        .then((response) => {
          const alldata = response.data;
          settabledata(alldata);
        })
        .catch(() => {
          console.log("error occured");
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
              Delete Candidate
            </button>
          </div>
        </div>
        <div >
          <div>
            <div className="mainDetailBodyDiv">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Party Name</th>
                  <th>CNIC</th>
                  <th>District</th>
                  <th>Gender</th>
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

export default Candidate;