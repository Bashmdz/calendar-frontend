import React, { useContext } from "react";
import UserData from "../contexts/UserData";

export default function Profile() {
  const { session } = useContext(UserData);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className=" p-3">
            <div className="">
              <h2 className="text-center mb-4">My Profile</h2>
              <div className="mb-3 mt-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={session?.personal?.name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={session?.personal?.email}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
