import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Userpool from "../../Userpool";
import { Container, Col, Row } from "react-bootstrap";
import "./SignUp.css";

const setCognitoUserAttribute = (attributeKey, attributeValue) => {
  let data = {
    Name: attributeKey,
    Value: attributeValue,
  };
  return new CognitoUserAttribute(data);
};

const SignUp = () => {
  const [showverification, setShowverification] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    var attributeList = [];
    attributeList.push(setCognitoUserAttribute("username", "true"));
    attributeList.push(setCognitoUserAttribute("email_verified", "true"));

    if (password !== confirmPassword) {
      alert("Password and confirm password are not the same");
      return;
    }

    Userpool.signUp(email, confirmPassword, [], null, (err, data) => {
      if (data) {
        console.log(data);
        setShowverification(true);
      }
      if (err) {
        console.error(err);
      }
    });
  };

  const verifyOTP = () => {
    console.log("Inside Verify OTP");
    const userData = {
      Username: email,
      Pool: Userpool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, (err, data) => {
      if (data) {
        console.log(data);
        history.push("/dashboard");
      }
      if (err) {
        console.error(err);
      }
      // routeChange();
    });
  };

  return (
    <div className="image2">
      <Container>
        {!showverification && (
          <Row>
            <Col>
              <div>
                <div className="sh">
                  <h1>SignUp</h1>
                </div>
                <div className="signup">
                  <form onSubmit={onSubmit}>
                    <div>
                      <input
                        value={username}
                        type="text"
                        placeholder="User Name"
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        value={email}
                        type="mail"
                        placeholder="Mail ID"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm password"
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                    </div>

                    <div>
                      <button type="submit" className="signupBtn">
                        SignUp
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {showverification && (
          <div className="signup">
            <input
              type="code"
              placeholder="Enter the code"
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <div className="signupBtn">
              <button onClick={verifyOTP} type="button">
                Verify
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SignUp;
