import React, { useState } from "react";
import "./MyDropdown.css";

function MyDropdown(props) {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownId = `dropdown-${props.questionId}`;

  const handleSelectChange = (value) => {
    props.handleSelectChange(value, props.questionId);
    setIsVisible(false);
  };

  const selectedHandle = (value) => {
    props.selectedHandle(value);
    setIsVisible(false);
  };

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className="dropdown">
        <input className="input-config" type="checkbox" id={dropdownId} />

        <label
          className="dropdown__face"
          htmlFor={dropdownId}
          onClick={toggleDropdown}
          style={{ zIndex: isVisible ? 1 : "auto" }}
        >
          <div className="dropdown__text">
            {" "}
            {props.type == "checkbox"
              ? "Checkboxes"
              : props.type == "radio"
              ? "Multiple Choice"
              : "Short Answer"}
          </div>

          <div className="dropdown__arrow"></div>
        </label>
        <ul
          className="dropdown__items"
          style={{
            visibility: isVisible ? "visible" : "hidden",
            opacity: isVisible ? 1 : 0,
            zIndex: isVisible ? 1 : -1,
          }}
        >
          <li
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectChange("checkbox", props.questionId)}
          >
            ☑️
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectChange("radio", props.questionId)}
          >
            🔘
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectChange("short answer", props.questionId)}
          >
            〣
          </li>
        </ul>
        <svg>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>
      </div>
    </div>
  );
}

export default MyDropdown;
