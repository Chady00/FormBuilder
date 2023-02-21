import React from "react";
import "./FormAdder.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import NewForm from "./NewForm.png";

function FormAdder() {
  return (
    <div>
      <div className="header" style={{ maxHeight: "90px" }}>
        <Header formadder={true} />
        <p
          style={{
            color: "black",
            fontSize: "16px",
            fontWeight: "500",
            position: "absolute",
            left: "205px",
            top: "90px",
          }}
        >
          Start a new form
        </p>

        <Link to="/form">
          <div className="Add-container">
            <div
              class="card"
              style={{
                position: "absolute",
                left: "200px",
                top: "150px",
                cursor: "pointer",
              }}
            ></div>

            <img
              className="newForm"
              src={NewForm}
              alt="upload icon"
              style={{
                width: "50px",
                height: "50px",
                marginTop: "95px",
                borderRadius: "2px",
                cursor: "pointer",
                position: "absolute",
                left: "255px",
              }}
            />
          </div>
        </Link>
        <p
          style={{
            color: "black",
            fontSize: "15px",
            fontWeight: "300",
            position: "absolute",
            left: "205px",
            top: "280px",
          }}
        >
          Blank
        </p>
      </div>
      <div className="addContainer"></div>
    </div>
  );
}

export default FormAdder;
