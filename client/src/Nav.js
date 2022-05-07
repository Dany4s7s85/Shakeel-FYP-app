import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <div className="NavMainDiv">
        <ul>
          <li>
            <Link to="/" className="CustomLink">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin" className="CustomLink">
              Admin
            </Link>
          </li>
          <li>
            <Link to="/candidate" className="CustomLink">
              Candidates
            </Link>
          </li>
          <li>
            <Link to="/votdetail" className="CustomLink">
              Voters
            </Link>
          </li>
          <li>
            <Link to="/result" className="CustomLink">
              Result
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
