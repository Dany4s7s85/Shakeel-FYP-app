import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Admin from "./AdminPage.js";
import Candidate from "./Candidate.js";
import VotCast from "./vote.js";
import VotersDetail from "./Voters.js";
import Result from "./result";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={VotCast} />
        <Route path="/admin" component={Admin} />
        <Route path="/candidate" component={Candidate} />
        <Route path="/votdetail" component={VotersDetail} />
        <Route path="/result" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
