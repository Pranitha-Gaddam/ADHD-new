import Detector from "../../components/Detector/ADHDDetector";
import Nav from "../../components/Navbar/Nav";
import React from "react";

function DetectorPage() {
  return (
    <div className="flex h-screen pt-15">
        <div className="w-20">
            <Nav />
        </div>
        <div className= "flex-1 pl-4 pt-4"> 
            <h1 className="text-3xl font-bold mb-4 text-center">ADHD Detector</h1>
            <Detector />
        </div>
    </div>
    
  );
}
export default DetectorPage;