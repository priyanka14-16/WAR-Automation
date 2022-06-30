import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Account";
import ChangePassword from "../changePassword/ChangePassword";
// import ChangeEmail from "../changeEmail/ChangeEmail";
const Settings = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      console.log("getSession");
      setLoggedIn(true);
    });
  }, []);
  return (
    <div className="settings">
      <h1>Settings</h1>
      {loggedIn && (
        <>
          <ChangePassword />
          {/* <ChangeEmail /> */}
        </>
      )}
    </div>
  );
};

export default Settings;
