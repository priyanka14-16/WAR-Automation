import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Account";
import { Container, Row, Col } from "react-bootstrap";
import "./Pagehome.css";

const Pagehome = () => {
  const { getSession } = useContext(AccountContext);

  const [resources, setResources] = useState([
    { name: "Select All" },
    { name: "EC2" },
    { name: "S3" },
    { name: "RDS" },
  ]);
  const [url, setUrl] = useState();

  async function handleData(e) {
    e.preventDefault();
  }

  const downlaod = async () => {
    console.log("ON DOWNLOAD CLICK");
    var myCheckbox = document.getElementsByName("myCheckbox");
    var selectedResources = [];
    Array.prototype.forEach.call(myCheckbox, function (element) {
      if (element.checked) {
        selectedResources.push(element.id.toLowerCase());
      }
    });
    console.log("SELECTED RESOURCES", selectedResources);

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      services: selectedResources,
    });

    var requestOptions = {
      method: "POST",

      headers: myHeaders,

      body: raw,

      redirect: "follow",
    };

    fetch(
      "https://d0uuk2v7p3.execute-api.ap-south-1.amazonaws.com/test/invoke",
      requestOptions
    )
      .then((result) => result.json())

      .then((response) => {
        console.log(response);
        if (response?.body.length > 0) {
          let resourceURLs = response.body;
          console.log(resourceURLs);
          resourceURLs.map((url) => {
            console.log(url);

            window.location = url;
          });
          setUrl(resourceURLs);
        }
        return response;
      })

      .catch((error) => console.log("error", error));

    // var raw = JSON.stringify({
    //   services: selectedResources,
    // });
    // console.log("RAW", raw);
    // await fetch(
    //   "https://d0uuk2v7p3.execute-api.ap-south-1.amazonaws.com/test/invoke",
    //   { method: "POST", body: raw }
    // )
    //   .then((response) => response.json())
    //   .then((response) => {
    //     if (Object.keys(response).length > 0) {
    //       let resourceURLs = [response.url];
    //       console.log(resourceURLs);
    //       resourceURLs.map((url) => {
    //         console.log(url);

    //         window.location = url;
    //       });
    //       setUrl(resourceURLs);
    //     }
    //     return response;
    //   });
  };

  const checkboxChange = (e, element) => {
    console.log("CheckBox Changed");
  };

  return (
    <div className="image4">
      <Container>
        <form onSubmit={handleData}>
          <div className="Checkbox">
            <h3>
              <b
                style={{
                  color: "white",
                }}
              >
                SELECT SERVICES
              </b>
            </h3>
          </div>

          {resources.map((resource, index) => (
            <div
              className="Checkbox"
              style={{
                color: "white",
              }}
              key={index}
            >
              <input
                name="myCheckbox"
                type="checkbox"
                className="form-check-input"
                id={resource.name}
                onChange={(e) => checkboxChange(e, this)}
              />
              <label className="form-check-label ms-2">{resource.name}</label>
            </div>
          ))}

          <button type="button" className="homeBtn" onClick={() => downlaod()}>
            Download
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Pagehome;
