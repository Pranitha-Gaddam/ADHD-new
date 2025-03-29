import Nav from "../../components/Navbar/Nav";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Start() {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleStart = () => {
        navigate("/detector/questions"); // Navigate to the Detector page
    };

    return (
        <div className="flex h-screen pt-15">
            <div className="w-20">
                <Nav />
            </div>
            <div className="flex-1 pl-4 pt-4">
                <h1 className="text-3xl font-bold mb-4 text-center">ADHD Detector</h1>
                <p className="text-center">Click the button below to start the detector.</p>
                <button
                    onClick={handleStart} // Attach the click handler
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Start Detector
                </button>
            </div>
        </div>
    );
}

export default Start;