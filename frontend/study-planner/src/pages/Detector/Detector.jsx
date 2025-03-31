import React, { useState, useEffect } from "react";
import Questions from "../../components/Detector/ADHDquestions";
import AIResponse from "../../components/Detector/AI";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import bgImage from "../../assets/images/adhd.jpg";
import UniversalNavbar from "../../components/Navbar/UniversalNavbar";
import Nav from "../../components/Navbar/Nav";
import axiosInstance from "../../utils/axiosInstance";

function Detector() {
  let score = 0;
  const [showExample, setExample] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleExampleClick = () => setExample(!showExample);

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setExample(false);
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setExample(false);
    }
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    const questionId = Questions[currentQuestion].id;
    setScores((prevScores) => ({ ...prevScores, [questionId]: value }));
  };

  const handleResultClick = () => {
    const finalScore = calculateScore();
    setResult(finalScore);
    navigate("/detector/questions/results", { state: { score: finalScore } });
  };

  const calculateScore = () => {
    for (let i = 0; i < Questions.length; i++) {
      if (Questions[i].positiveAnswer.includes(parseInt(scores[Questions[i].id]))) {
        score += 1;
      }
    }
    console.log(`Score: ${score}`);
    return score;
  };

  return (
    <div className="fixed inset-0 flex flex-col font-montserrat">
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Universal Navbar on top */}
      <UniversalNavbar userInfo={userInfo} pageTitle="ADHD Detector" />

      <div className="relative z-10 flex flex-1 w-full">
        {/* Side Navigation */}
        <div className="w-20 z-10">
          <Nav />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 ml-20 mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-4xl"
          >
            <div className="w-full bg-gray-300 rounded-full h-2 mb-6">
              <div
                className="bg-slate-800 h-2 rounded-full"
                style={{ width: `${((currentQuestion + 1) / Questions.length) * 100}%` }}
              ></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={Questions[currentQuestion].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="question-block"
              >
                <div className="flex items-start justify-between">
                  <p className="text-xl font-semibold text-gray-800 mb-4">
                    {currentQuestion + 1}. {Questions[currentQuestion].question}
                  </p>
                  <button
                    className="text-sm text-slate-800 hover:underline font-medium ml-4"
                    onClick={handleExampleClick}
                  >
                    {showExample ? "Hide Example" : "Show Example"}
                  </button>
                </div>

                {showExample && (
                  <div className="bg-slate-100 p-4 rounded-md mb-4 text-sm text-gray-700 border border-slate-200">
                    <AIResponse prompt={Questions[currentQuestion].question} />
                  </div>
                )}

                <div className="mt-6">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={scores[Questions[currentQuestion].id] || 0}
                    onChange={handleSliderChange}
                    className="w-full accent-slate-800"
                  />
                  <div className="flex justify-between text-sm text-gray-700 mt-2 font-medium">
                    <span>Never</span>
                    <span>Rarely</span>
                    <span>Sometimes</span>
                    <span>Often</span>
                    <span>Very Often</span>
                  </div>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    onClick={handlePrevClick}
                    disabled={currentQuestion === 0}
                    className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 shadow-sm"
                  >
                    Previous
                  </button>

                  {currentQuestion === Questions.length - 1 ? (
                    <button
                      onClick={handleResultClick}
                      disabled={!Questions.every((q) => scores[q.id] !== undefined)}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-md"
                    >
                      See Result
                    </button>
                  ) : (
                    <button
                      onClick={handleNextClick}
                      className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 shadow-md"
                    >
                      Next
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Detector;