import React from "react";
import { useState } from "react";
import "./Options.css";
import deleted from "./delete.png";

// use state for type

function Options(props) {
  const buttonId = `req-${props.id}`;
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      {props.options &&
        props.options.map((option, index) => (
          <div className="options" key={index}>
            <input
              type={props.type}
              value=""
              style={{ marginTop: "12px" }}
              name="gender"
              disabled
            />{" "}
            <input
              type="text"
              className="upper-form-input"
              placeholder={"Option" + " " + props.options[index].id}
              style={{
                fontSize: "14px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
              onChange={(e) => props.handleOptionChange(e, index + 1, props.id)}
              onInput={(e) => {
                const updatedOptions = [...props.options];
                updatedOptions[index].option = e.target.value;
                props.handleOptionChange(updatedOptions, props.id);
              }}
              value={option.option}
            />
            {props.options.length > 1 ? (
              <button
                onClick={() =>
                  props.deleteOptionHandle(props.options[index].id, props.id)
                }
                className="delete-button"
                fontfamily=" 'Roboto', sans-serif"
              >
                X
              </button>
            ) : null}
          </div>
        ))}
      <div className="options">
        <input
          type={props.type}
          value="Male"
          style={{ marginTop: "20px" }}
          name="gender"
          disabled
        />{" "}
        <button
          className="upper-form-input"
          style={{
            fontSize: "14px",
            marginRight: "420px", // Change this to move the button to the left
            backgroundColor: "transparent",
            color: "#808a99",
            paddingTop: "17px",
          }}
          onClick={() => props.addOptionHandle(props.id)}
        >
          Add Option
        </button>
        <div className="switch">
          <input
            type="checkbox"
            id={`required-switch-${props.id}`}
            className="required-switch"
            checked={isChecked}
            onChange={handleToggle}
          />

          <label htmlFor={`required-switch-${props.id}`}></label>
        </div>
        <button
          style={{
            backgroundImage: `url(${deleted})`,
            border: "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "transparent",
            cursor: "pointer",
            width: "130px",
            height: "30px",
            marginTop: "18px",
            marginRight: "25px",
          }}
          onClick={() => props.deleteQuestionHandle(props.id)}
        ></button>
      </div>
    </div>
  );
}

export default Options;
