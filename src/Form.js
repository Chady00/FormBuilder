import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./Form.css";
import GrayBox from "./GrayBox";
import Options from "./Options";
import Header from "./Header";
import MyDropdown from "./MyDropdown";
import uploadIcon from "./uploadIcon.jpg";
import { motion } from "framer-motion";
import add from "./add.png";
import sections from "./sections.png";
import video from "./video.png";
import { saveAs } from "file-saver";

function Form(props) {
  // form details
  // make form data array that contains all the below use states
  const [FormName, setFormName] = useState("Untitled form");
  const [FormDesc, setFormDesc] = useState("Form Description");

  // the index of each Qoptions array is the same as the index of the question in the questions array
  const [Qoptions, setQoptions] = useState([[{ option: "", id: 1 }]]);
  const [questions, setQuestions] = useState([
    {
      title: "",
      id: 1,
      type: "radio",
      clicked: false,
    },
  ]);

  // use state array of options
  const [clickedOne, setClickedOne] = useState(true);
  const [Showbox1, setShowbox1] = useState(false);
  const [Showbox2, setShowbox2] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  let x = 1,
    readyChild = 1;
  //scroll distance
  const prevScrollPosRef = useRef(120);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.pageYOffset;
      const distanceInPx =
        Math.abs(currentScrollPos - prevScrollPosRef.current) *
        (window.devicePixelRatio || 1);
      setScrollDistance(distanceInPx);
      prevScrollPosRef.current = currentScrollPos;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    x = 1;
  }, [questions]);

  useEffect(() => {
    readyChild = 1;
  }, [questions]);

  // use state for questions
  /******************* handling option changes with same id  ***********/
  // addoption but must have question id
  const addOption = (id) => {
    //check if the option is not empty first if empty add fixed option with id 1 and if not do
    const newOptions = [...Qoptions];
    if (Qoptions[id - 1] === undefined) {
      newOptions[id - 1] = [];
      newOptions[id - 1].push({
        option: "",
        id: 1,
      });
    } else {
      newOptions[id - 1].push({
        option: "",
        id: Math.max(...Qoptions[id - 1].map((option) => option.id)) + 1,
      });
    }

    setQoptions(newOptions);
  };

  //remove the option with same id having same question id from qOptions array
  const deleteOption = (id, questionId) => {
    const newOptions = [...Qoptions];
    newOptions[questionId - 1] = newOptions[questionId - 1].filter(
      (option) => option.id !== id
    );
    setQoptions(newOptions);
  };

  // add question
  const addQuestion = () => {
    // check if question is not empty first
    if (questions.length === 0) {
      setQuestions([
        {
          id: 1,
          title: "",
          type: "radio",
          clicked: false,
        },
      ]);
      setQoptions([[{ option: "", id: 1 }]]);
    } else if (selectedIndex === questions.length) {
      const newQuestions = [...questions];
      newQuestions.push({
        id: Math.max(...questions.map((question) => question.id)) + 1,
        title: "",
        type: "radio",
        clicked: false,
      });
      setQuestions(newQuestions);
      setQoptions([...Qoptions, [{ option: "", id: 1 }]]);
    }
    // else add question between selected and the one after it and reorder the ids
    else {
      const newQuestions = [...questions];
      newQuestions.splice(selectedIndex, 0, {
        id: Math.max(...questions.map((question) => question.id)) + 1,
        title: "",
        type: "radio",
        clicked: false,
      });
      newQuestions.map((question, index) => {
        question.id = index + 1;
      });
      setQuestions(newQuestions);
      const newOptions = [...Qoptions];
      newOptions.splice(selectedIndex, 0, [{ option: "", id: 1 }]);
      setQoptions(newOptions);
    }
    // set the selected index to the newly added question
    readyChild = 0;

    setSelectedIndex(selectedIndex + 1);
    setClickedOne(false);
  };

  //delete question based on question id
  const deleteQuestionHandle = (id) => {
    x = 0;
    const newQuestions2 = [...questions];
    const newOptions = [...Qoptions];
    newQuestions2.splice(id - 1, 1);
    // reorder the ids of the questions
    newQuestions2.map((question, index) => {
      question.id = index + 1;
    });
    newOptions.splice(id - 1, 1);
    // reorder the ids of the options
    newOptions.map((option, index) => {
      option.map((option) => {
        option.id = index + 1;
      });
    });
    setSelectedIndex(0);
    readyChild = 0;

    setQuestions(newQuestions2);
    setQoptions(newOptions);
  };

  ///handleOptionChange takes e and id based on question and updates the value of option corresponding to id
  const handleOptionChange = (e, id, questionId) => {
    const updatedOptions = Qoptions.map((option, index) => {
      if (index === questionId - 1) {
        return option.map((option) => {
          if (option.id === id) {
            return { ...option, option: e.target.value };
          }
          return option;
        });
      }
      return option;
    });
    setQoptions(updatedOptions);
  };

  /******************** options handling *************** */
  const [selectedOption, setSelectedOption] = useState("radio");

  //handleSelectChange takes normal param and question id
  const handleSelectChange = (param, id) => {
    x = 0;
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, type: param };
      }
      return question;
    });
    // adjust qOptions array
    const updatedOptions = Qoptions.map((option, index) => {
      if (index === id - 1) {
        if (param === "short answer") {
          return [{ option: "", id: 1 }];
        }
      }
      return option;
    });
    setQoptions(updatedOptions);
    setQuestions(updatedQuestions);
  };

  //update question title
  const handleQuestionChange = (e, id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, title: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  /******************** handling css clicks **************/
  const handleClick = (param) => {
    if (x) {
      const updatedQuestions = questions.map((question) => {
        if (question.id === param) {
          return { ...question, clicked: true };
        } else return { ...question, clicked: false };
      });
      setQuestions(updatedQuestions);
      if (param === "one") {
        setClickedOne(true);
        setSelectedIndex(0);
      } else {
        setClickedOne(false);
        setSelectedIndex(param);
      }
    }
  };

  const handleFocus = (param) => {
    if (param == "one") {
      setShowbox1(true);
      setShowbox2(false);
    } else if (param == "two") {
      setShowbox1(false);
      setShowbox2(true);
    } else {
      setShowbox1(false);
      setShowbox2(false);
    }
  };
  /******************* DOWNLOADING JSON **************/

  const handleDownload = () => {
    const FormData = {
      FormName: FormName,
      FormDesc: FormDesc,
      questions: questions,
      options: Qoptions,
    };
    const element = document.createElement("a");
    const file = new Blob(
      [JSON.stringify(FormData, null, 2)], // Use a space value of 2 for indentation
      {
        type: "application/json",
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = FormName;
    document.body.appendChild(element);
    element.click();
  };
  // export function as html
  const exportDownload = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    saveAs(blob, FormName + ".html");
  };

  return (
    <>
      <div className="main-container">
        {props.hideHeader ? null : (
          <Header
            exportHandle={exportDownload}
            downHandle={handleDownload}
            title={FormName}
          />
        )}
        <div className="sub-main-continer">
          <div className="form-container">
            <div
              className="upper-form"
              onClick={() => handleClick("one")}
              style={{
                borderLeft: clickedOne ? "6px solid #4285f4" : "0",
              }}
              id="0"
            >
              <input
                type="text"
                className="upper-form-input"
                id="form-name"
                placeholder={FormName}
                style={{
                  fontSize: "30px",
                }}
                onFocus={() => handleFocus("one")}
                onChange={(e) => setFormName(e.target.value)}
              />
              {Showbox1 && clickedOne ? <GrayBox handle={handleFocus} /> : null}

              <input
                type="text"
                className="upper-form-input"
                placeholder={FormDesc}
                style={{
                  fontSize: "15px",
                  placeholder: { fontSize: "15px" },
                }}
                onFocus={() => handleFocus("two")}
                onChange={(e) => setFormDesc(e.target.value)}
              />
              {Showbox2 && clickedOne ? <GrayBox handle={handleFocus} /> : null}
            </div>

            {questions.map((question, index) => (
              <div
                id={index + 1}
                className="lower-form"
                style={{
                  borderLeft:
                    selectedIndex === question.id ? "6px solid #4285f4" : "0",

                  boxShadow: question.clicked
                    ? "0px 5px 10px rgba(0, 0, 0, 0.1)"
                    : "none",
                }}
                onClick={() => handleClick(question.id)}
              >
                <div className="question" id="first">
                  <div className="question-type">
                    <div className="question-type-text">
                      <input
                        className="question-title"
                        placeholder="Untitled Question"
                        onChange={(e) => handleQuestionChange(e, question.id)}
                        value={
                          questions[index].title !== ""
                            ? questions[index].title
                            : ""
                        }
                        onInput={(e) => {
                          e.target.style.height = "inherit";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                      />
                      <img
                        src={uploadIcon}
                        alt="upload icon"
                        style={{
                          width: "21px",
                          height: "20px",
                          marginTop: "15px",
                          marginLeft: "20px",
                          marginRight: "5px",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                      />
                      <MyDropdown
                        questionId={question.id}
                        handleSelectChange={handleSelectChange}
                        type={question.type}
                      />
                    </div>

                    {question.type != "short answer" ? (
                      <div className="question-type-dropdown">
                        <Options
                          handleOptionChange={handleOptionChange}
                          deleteOptionHandle={deleteOption}
                          deleteQuestionHandle={deleteQuestionHandle}
                          options={Qoptions[index]}
                          addOptionHandle={addOption}
                          type={question.type}
                          id={question.id}
                        />
                      </div>
                    ) : (
                      // input field
                      <input
                        type="text"
                        className="upper-form-input"
                        placeholder="Short Text Answer"
                        style={{
                          fontSize: "15px",
                          placeholder: { fontSize: "15px" },
                          marginTop: "20px",
                          backgroundColor: "#FBFBFC",
                          borderBottom: "1px dotted #000",
                        }}
                        disabled
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {props.hideHeader ? null : (
            <motion.div
              className="slider"
              initial={{ y: 0, x: 380 }}
              style={{ position: "fixed" }}
              animate={{
                y: Math.min(
                  clickedOne && document.getElementById(0)
                    ? document.getElementById(0).getBoundingClientRect().y - 120
                    : selectedIndex &&
                      document.getElementById(selectedIndex) &&
                      readyChild
                    ? document
                        .getElementById(selectedIndex)
                        .getBoundingClientRect().y - 120
                    : 0
                ),
              }}
              transition={{ duration: 0.1, type: "spring", stiffness: 70 }}
            >
              <button
                className="slider-button"
                style={{
                  backgroundImage: `url(${add})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                }}
                onClick={() => addQuestion()}
              ></button>
              <button
                className="slider-button"
                style={{
                  backgroundImage: `url(${video})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                }}
              ></button>
              <button
                className="slider-button"
                style={{
                  backgroundImage: `url(${sections})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                }}
              ></button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
