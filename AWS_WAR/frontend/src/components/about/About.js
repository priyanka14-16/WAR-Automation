import React, { useContext } from "react";
import { AccountContext } from "../Account";
import "./About.css";

const About = () => {
  const { getSession } = useContext(AccountContext);

  return <div>About</div>;
};

export default About;
