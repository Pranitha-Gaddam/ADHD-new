import React, { useState } from "react";
import Questions from "./ADHDquestions"; // Make sure this file exists and exports the array
import AIResponse from "./AI";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Detector() {
  let score = 0;

  const [showExample, setExample] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({}); // Initialize scores array
  const [result, setResult] = useState(null); // Initialize result state
  const navigate = useNavigate(); // Initialize the navigate function
  
  const handleExampleClick = () => {
    setExample(!showExample);
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setExample(false); // Hide example when going back to previous question
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setExample(false); // Hide example when going to next question
    }
  };

  const handleScoreChange = (event) => {
    const value = event.target.value;
    const questionId = Questions[currentQuestion].id;

    setScores((prevScores) => ({
      ...prevScores,
      [questionId]: value,
    }));
  };

  const handleResultClick = () => {
    const finalScore = calculateScore(); // Calculate the score
    setResult(finalScore); // Set the result state
    navigate("/detector/questions/results", { state: { score: finalScore } }); // Navigate to the results page with the score
  }

  const calculateScore = () => {
    for (let i = 0; i < Questions.length; i++) {
      if (Questions[i].positiveAnswer.includes(parseInt(scores[Questions[i].id]))) {
        score += 1;
      }
    }
    console.log(`Score: ${score}`);
    return score;
  }

  return (
    <div>
        <div key={Questions[currentQuestion].id} className="question-block">
            <div className="flex flex-row">
                <p>{currentQuestion+1}. {Questions[currentQuestion].question}</p>
                <button className="ml-2 text-blue-500" onClick={handleExampleClick}>
                    Example
                </button>
                {showExample && <AIResponse prompt={Questions[currentQuestion].question} />}
            </div>

            <div className="radio-group pb-4">
                <label>
                    <input  type="radio"
                            name={`question-${Questions[currentQuestion].id}`} 
                            value="0" 
                            checked={scores[Questions[currentQuestion].id]==="0"} 
                            onChange={handleScoreChange}/> 
                            Never
                </label>
                <label>
                    <input  type="radio" 
                            name={`question-${Questions[currentQuestion].id}`} 
                            value="1"
                            checked={scores[Questions[currentQuestion].id] === "1"}
                            onChange={handleScoreChange}/>
                            Rarely
                </label>
                <label>
                    <input  type="radio" 
                            name={`question-${Questions[currentQuestion].id}`} 
                            value="2"
                            checked={scores[Questions[currentQuestion].id] === "2"} 
                            onChange={handleScoreChange}/>
                            Sometimes
                </label>
                <label>
                    <input  type="radio" 
                            name={`question-${Questions[currentQuestion].id}`} 
                            value="3" 
                            checked={scores[Questions[currentQuestion].id] === "3"}
                            onChange={handleScoreChange}/>
                            Often
                </label>
                <label>
                    <input  type="radio" 
                            name={`question-${Questions[currentQuestion].id}`} 
                            value="4" 
                            checked={scores[Questions[currentQuestion].id] === "4"}
                            onChange={handleScoreChange}/>
                            Very Often
                </label>
            </div>
            <div className="flex justify-between">
                <button onClick={handlePrevClick} disabled={currentQuestion === 0}>
                    Previous
                </button>
                {
                    currentQuestion === (Questions.length - 1) ? (
                      <button className="pr-4" onClick={handleResultClick} disabled={!Questions.every(q => scores[q.id] !== undefined)}>
                        Result
                      </button>
                    ) : (
                      <button className="pr-4" onClick={handleNextClick} disabled={currentQuestion === Questions.length - 1}>
                        Next  
                      </button>
                    )
                }
            </div>
        </div>
    </div>
  );
}

export default Detector;