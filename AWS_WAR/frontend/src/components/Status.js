import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";
import "./Status.css";

const Status = () => {
  const [status, setStatus] = useState(false);

  const { getSession } = useContext(AccountContext);
  console.log("GETSESSION: ", getSession);

  useEffect(() => {
    console.log("Status useEffect");
    getSession().then((session) => {
      console.log("Session:", session);
      setStatus(session);
    });
  }, [getSession]);

  return (
    <div className="status">
      {status && (
        <div>
          {/* <div className="loggedInMessage">
            Your are logged in! {status?.username}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Status;
