import React, { useState } from "react";
import Questions from "./ADHDquestions"; // Make sure this file exists and exports the array
import AIResponse from "./AI";

function Detector() {
  const [showExample, setExample] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleClick = () => {
    setExample(!showExample);
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div>
        <div key={Questions[currentQuestion].id} className="question-block">
            <div className="flex flex-row">
                <p>{Questions[currentQuestion].question}</p>
                <button className="ml-2 text-blue-500" onClick={handleClick}>
                    Example
                </button>
                {showExample && <AIResponse prompt={Questions[currentQuestion].question} />}
            </div>

            <div className="radio-group pb-4">
                <label>
                    <input type="radio" name={`question-${Questions[currentQuestion].id}`} value="0" /> Never
                </label>
                <label>
                    <input type="radio" name={`question-${Questions[currentQuestion].id}`} value="1" /> Rarely
                </label>
                <label>
                    <input type="radio" name={`question-${Questions[currentQuestion].id}`} value="2" /> Sometimes
                </label>
                <label>
                    <input type="radio" name={`question-${Questions[currentQuestion].id}`} value="3" /> Often
                </label>
                <label>
                    <input type="radio" name={`question-${Questions[currentQuestion].id}`} value="4" /> Very Often
                </label>
            </div>
            <div className="flex justify-between">
                <button onClick={handlePrevClick} disabled={currentQuestion === 0}>
                    Previous
                </button>
                <button className="pr-4" onClick={handleNextClick} disabled={currentQuestion === Questions.length - 1}>
                    Next
                </button>
            </div>
        </div>
    </div>
  );
}

export default Detector;