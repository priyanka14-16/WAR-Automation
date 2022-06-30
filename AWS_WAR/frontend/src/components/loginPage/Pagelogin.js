import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AccountContext } from "../Account";
import "./Pagelogin.css";
import { Container, Col, Row } from "react-bootstrap";

const Pagelogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const routeChange = () => {
    let path = `/dashboard`;
    history.push(path);
  };

  console.log("Pagelogin authenticate:", useContext(AccountContext));
  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        window.location.href = "/dashboard";
        // alert("You are logged in", data);
      })
      .catch((err) => {
        alert(
          "Credentials are entered wrong. Please re-enter and try to log in again",
          err
        );
      });
  };

  // let myStyle = {
  //   backgroundImage: Img,
  //   //height: "100vh",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //id="image" style={myStyle}
  // };

  return (
    <div className="image">
      <Container>
        <Row>
          <Col>
            <div className="login">
              <div className="lh">
                <h1>Login</h1>
              </div>
              <div>
                <form onSubmit={onSubmit}>
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
                    <div>
                      <button type="submit" className="loginBtn">
                        Login
                      </button>
                    </div>
                    <div>
                      <p
                        style={{
                          textAlign: "right",
                          color: "white",
                          width: "40%",
                        }}
                      >
                        <a href={"/ForgotPassword"}>Forgot password</a>
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "white",
                        }}
                      >
                        <a href={"/signup"}>Don't have an account? Sign up</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pagelogin;
