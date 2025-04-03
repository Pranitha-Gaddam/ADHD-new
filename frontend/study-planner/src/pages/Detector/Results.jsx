import Nav from "../../components/Navbar/Nav";
import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

function Results() {
    const location = useLocation();
    const { score } = location.state || {}; // Get the score from the location state
    console.log(`Score from Results: ${score}`); // Log the score for debugging

//     - Add description about the scoring system 
//     Score (0–18)	Interpretation
//         0–4	Low likelihood / Unlikely ADHD
//         5–8	Mild indication / Monitor symptoms
//         9–12	Moderate likelihood / Possible ADHD
//         13–15	High likelihood / Strong signs of ADHD
//         16–18	Very high likelihood / Clinical attention recommended
//     - Need to add this part 
//       "This is a screening suggestion, not a diagnosis. A licensed professional should always evaluate further."

    return (
        <div className="flex h-screen pt-15">
            <div className="w-20">
                <Nav />
            </div>
            <div className="flex-1 pl-4 pt-4">
                <h1 className="text-3xl font-bold mb-4 text-center">ADHD Detector Results</h1>
                <p className="text-center">Your score is: {score}</p>
                {/* Add more details about the results here */}
            </div>
        </div>
    );
}

export default Results;