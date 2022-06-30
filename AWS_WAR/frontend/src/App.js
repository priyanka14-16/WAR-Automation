import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Account } from "./components/Account";
import FooterPage from "./components/footerPage/FooterPage";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import HeaderPage from "./components/headerPage/HeaderPage";
import Detail from "./components/details/Detail";
import Pagehome from "./components/homePage/Pagehome";
import Pagelogin from "./components/loginPage/Pagelogin";
import Settings from "./components/setting/Settings";
import About from "./components/about/About";
import SignUp from "./components/signup/SignUp";
import Status from "./components/Status";
import Userpool from "./Userpool";
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    return await new Promise((resolve, reject) => {
      const user = Userpool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            setUser();
            reject();
          } else {
            setUser(user);
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });
            resolve({ user, ...session, ...attributes });
          }
        });
      } else {
        reject();
      }
    });
  };

  let myStyle = {
    backgroundImage: "url('')",
    //height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Account>
      <BrowserRouter>
        <HeaderPage />
        <div id="image" style={myStyle}>
          <Status />
          {user ? (
            <Switch>
              <Route exact path="/" component={Detail} />
              <Route exact path="/dashboard" component={Pagehome} />
              <Route exact path="/about" component={About} />
              <Route exact path="/setting" component={Settings} />
              <Redirect to={"/dashboard"} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Detail} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Pagelogin} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/about" component={About} />
              <Route exact path="/dashboard" component={Pagehome} />
              <Route exact path="/setting" component={Settings} />
              <Redirect to="/" />
            </Switch>
          )}
        </div>
        <FooterPage />
      </BrowserRouter>
    </Account>
  );
}

export default App;
