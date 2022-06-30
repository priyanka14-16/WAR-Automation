import React, { useState } from "react";
import Pool from "../../Userpool";
import { CognitoUser } from "amazon-cognito-identity-js";
import "./ForgotPassword.css";
import { Container } from "react-bootstrap";

const ForgotPassword = () => {
  const [stage, setStage] = useState(1); //1 = email stage, 2 = code stage
  // const [showverification, setShowverification] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool,
    });
  };

  const sendCode = (event) => {
    event.preventDefault();
    console.log("GET USER", getUser());
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        setStage(2);
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and confirm password are not the same");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };
  return (
    <div className="image3">
      <Container>
        <div className="fh">
          <h1>Forgot Password</h1>
        </div>
        {stage === 1 && (
          <form onSubmit={sendCode}>
            <div className="forgot">
              <input
                value={email}
                type="mail"
                placeholder="Enter the mail ID to send verification code"
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="forgotBtn">
                <button type="submit">Send verification code</button>
              </div>
            </div>
          </form>
        )}

        {stage === 2 && (
          <form onSubmit={resetPassword}>
            <div className="forgot">
              <div>
                <input
                  value={code}
                  type="code"
                  placeholder="Enter the varification code"
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>
              <div>
                <input
                  value={password}
                  type="password"
                  placeholder="Enter the Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div>
                <input
                  value={confirmPassword}
                  type="password"
                  placeholder="Re-enter the password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <div className="forgotBtn">
                <button type="submit">Change password</button>
              </div>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
};

export default ForgotPassword;
