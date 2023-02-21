import React from "react";
import { useState } from "react";
import "./GrayBox.css";

function GrayBox(props) {
  // handle if a user clicks on the gray box
  const [selectedBox, setSelectedBox] = useState([false, false, false, false]);
  const handleSelect = (param) => {
    let newSelectedBox = [
      selectedBox[0],
      selectedBox[1],
      selectedBox[2],
      selectedBox[3],
    ];
    if (param === "B") {
      newSelectedBox[0] = !selectedBox[0];
    } else if (param === "I") {
      newSelectedBox[1] = !selectedBox[1];
    } else if (param === "U") {
      newSelectedBox[2] = !selectedBox[2];
    } else {
      newSelectedBox[3] = !selectedBox[3];
    }
    setSelectedBox(newSelectedBox);
  };

  return (
    <div
      style={{ marginRight: "78%" }}
      onBlur={() => props.handleFocus("three")}
    >
      <div className="box-container">
        <div
          className="gray-box"
          style={
            selectedBox[0]
              ? {
                  backgroundColor: "#D9D9D9",
                  transition: "background-color 0.1s ease-in-out",
                  color: "black",
                  font: "bold",
                }
              : {
                  transition: "background-color 0.1s ease-in-out",
                }
          }
          onClick={() => handleSelect("B")}
        >
          B
        </div>
        <div
          className="gray-box"
          style={
            selectedBox[1]
              ? {
                  backgroundColor: "#D9D9D9",
                  transition: "background-color 0.1s ease-in-out",
                  fontStyle: "italic",
                  color: "black",
                }
              : {
                  transition: "background-color 0.1s ease-in-out",
                  fontStyle: "italic",
                }
          }
          onClick={() => handleSelect("I")}
        >
          I
        </div>
        <div
          className="gray-box"
          style={
            selectedBox[2]
              ? {
                  backgroundColor: "#D9D9D9",
                  textDecoration: "underline",
                  transition: "background-color 0.1s ease-in-out",
                  color: "black",
                  font: "bold",
                }
              : {
                  textDecoration: "underline",
                  transition: "background-color 0.1s ease-in-out",
                }
          }
          onClick={() => handleSelect("U")}
        >
          U
        </div>
        <div
          className="gray-box"
          style={
            selectedBox[3]
              ? {
                  backgroundColor: "#D9D9D9",
                  transition: "background-color 0.1s ease-in-out",
                  color: "black",
                  font: "bold",
                }
              : { transition: "background-color 0.1s ease-in-out" }
          }
          onClick={() => handleSelect("L")}
        >
          L
        </div>
      </div>
    </div>
  );
}

export default GrayBox;
