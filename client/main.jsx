import React from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🌱 Virtual Garden</h1>
        <p className="text-gray-600">AI-Powered Plant Recognition & Garden Management</p>
        <div className="mt-8 space-y-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
