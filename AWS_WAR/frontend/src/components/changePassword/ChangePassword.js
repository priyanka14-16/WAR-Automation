import React, { useState, useContext } from "react";
import { AccountContext } from "../Account";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        user.changePassword(password, newPassword, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        });
      });
    });
  };
  return (
    <div className="leftSide">
      <h1>Change Password</h1>
      <form onSubmit={onSubmit}>
        <div className="changePassword">
          <input
            value={password}
            type="password"
            placeholder="Enter the current password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            value={newPassword}
            type="password"
            placeholder="Enter the new password"
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <div>
            <button type="submit" className="changePasswordBtn">
              Change password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
