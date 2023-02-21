import React, { useState } from "react";
import "./Header.css";
import headerIcon from "./headerIcon.png";
// import motion
import { motion } from "framer-motion";
import preview from "./preview.png";
import Star from "./Star.png";
import { Link } from "react-router-dom";
import sideMenu from "./sideMenu.png";
import SearchBar from "./SearchBar";
import apps from "./apps.png";

function Header(props) {
  const [isUnderlined, setIsUnderlined] = useState([true, false, false]);

  const handleButtonClick = (index) => {
    const updatedArray = isUnderlined.map((item, i) =>
      i === index ? true : false
    );
    setIsUnderlined(updatedArray);
  };

  return (
    <>
      <div className="header">
        <div
          style={{
            display: "flex",
          }}
        >
          <img
            src={sideMenu}
            alt="upload icon"
            style={{
              width: "25px",
              height: "30px",
              marginTop: "27px",
              borderRadius: "2px",
              cursor: "pointer",
              position: "absolute",
              left: "45px",
            }}
          />
          <Link to="/">
            <img
              src={headerIcon}
              alt="upload icon"
              style={{
                width: "45px",
                height: "50px",
                marginTop: "14px",
                borderRadius: "2px",
                cursor: "pointer",
                position: "absolute",
                left: "85px",
              }}
            />
          </Link>
          <p
            style={{
              color: "#2d363f",
              fontSize: "18px",
              marginTop: "32px",
              marginLeft: "15px",
              position: "absolute",
              left: "125px",
              marginRight: "20px",
              maxWidth: "120px",
            }}
          >
            {!props.formadder
              ? props.title
                ? props.title
                : "Untitled form"
              : "Forms"}
          </p>
          {!props.formadder ? (
            <img
              className="myStar"
              src={Star}
              alt="upload icon"
              style={{
                width: "20px",
                height: "20px",
                marginTop: "30px",
                borderRadius: "2px",
                cursor: "pointer",
                position: "absolute",
                left: "260px",
              }}
            />
          ) : (
            <>
              <SearchBar />
              <img
                src={apps}
                alt="upload icon"
                style={{
                  width: "28px",
                  height: "28px",
                  marginTop: "30px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  position: "absolute",
                  right: "45px",
                }}
              />
            </>
          )}
          {!props.formadder ? (
            <>
              <button
                className="button"
                style={{
                  float: "right",
                  marginTop: "20px",
                  backgroundColor: "#673ab7",
                  padding: "10.5px 23px",
                  color: "white",
                  borderRadius: "4px",
                  position: "absolute",
                  right: "95px",
                }}
                onClick={props.downHandle}
              >
                Save
              </button>
              <button
                className="button specific-button"
                style={{
                  float: "right",
                  marginTop: "20px",
                  backgroundColor: "#673ab7",
                  padding: "10.5px 23px",
                  color: "white",
                  borderRadius: "4px",
                  position: "absolute",
                  right: "190px",
                }}
                onClick={props.exportHandle}
              >
                Export
              </button>
              <Link to="/preview">
                <img
                  className="preview"
                  src={preview}
                  alt="upload icon"
                  style={{
                    float: "right",
                    marginTop: "25px",
                    width: "29x",
                    height: "29px",
                    position: "absolute",
                    right: "300px",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </>
          ) : null}
        </div>
      </div>
      {!props.formadder ? (
        <>
          <div className="header2">
            <div className="buttonContainer">
              <button
                className="button"
                style={{
                  borderBottom: isUnderlined[0] ? " 4px solid #80639f" : "none",
                  color: isUnderlined[0] ? "#80639f" : "#3f454a",
                  float: "left",
                }}
                onClick={() => handleButtonClick(0)}
              >
                Questions
              </button>
              <button
                className="button"
                style={{
                  borderBottom: isUnderlined[1] ? " 4px solid #80639f" : "none",
                  color: isUnderlined[1] ? "#80639f" : "#3f454a",
                  float: "left",
                }}
                onClick={() => handleButtonClick(1)}
              >
                Responses
              </button>
              <button
                className="button"
                style={{
                  borderBottom: isUnderlined[2] ? " 4px solid #80639f" : "none",
                  color: isUnderlined[2] ? "#80639f" : "#3f454a",
                  float: "left",
                }}
                onClick={() => handleButtonClick(2)}
              >
                Settings
              </button>
              <span
                class="bi bi-three-dots-vertical"
                style={{
                  marginBottom: "25px",
                  fontSize: "24px",
                  float: "right",
                  cursor: "pointer",
                  color: "#5f6368",
                  position: "absolute",
                  right: "60px",
                }}
              ></span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: "50px" }}></div>
        </>
      )}
    </>
  );
}

export default Header;
