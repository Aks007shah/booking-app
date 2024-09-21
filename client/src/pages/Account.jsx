import React from "react";
import { Link, Outlet } from "react-router-dom";

function Account(props) {
  return (
    <div>
      <h1 className="text-center m-3">Welcome Users!</h1>
      <div className="container-fluid border-0 d-flex flex-column justify-content-center align-items-center">
        <div className="row">
          <div className="col-sm-12 border-0">
            <div className="card border-0 text-center">
              <div className="card-header border-0">
                <Link to="/account/login" className="btn btn-link text-decoration-none">Login</Link>
                <div class="vr"></div>
                <Link to="/account/register" className="btn btn-link text-decoration-none">Register</Link>
              </div>
              <div className="card-body border-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
