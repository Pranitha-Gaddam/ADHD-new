import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Navbar/Nav";
import UniversalNavbar from "../../components/Navbar/UniversalNavbar";
import bgImage from "../../assets/images/adhd.jpg";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";

function Start() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleStart = () => {
    navigate("/detector/questions");
  };

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
  {/* Task to do 
      - Add description about the quiz from https://add.org/wp-content/uploads/2015/03/adhd-questionnaire-ASRS111.pdf or search more 
      - Add description about the scoring system 
        Score (0–18)	Interpretation
            0–4	Low likelihood / Unlikely ADHD
            5–8	Mild indication / Monitor symptoms
            9–12	Moderate likelihood / Possible ADHD
            13–15	High likelihood / Strong signs of ADHD
            16–18	Very high likelihood / Clinical attention recommended
      - Need to add this part 
          "This is a screening suggestion, not a diagnosis. A licensed professional should always evaluate further."
  */}
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

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-2xl p-10 bg-white/90 rounded-3xl shadow-xl text-center">
            
            <p className="text-xl font-bold text-gray-800 mb-6">
              Click the button below to start your ADHD self-check.
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold text-lg hover:bg-slate-900 shadow-md"
            >
              Start Detector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;