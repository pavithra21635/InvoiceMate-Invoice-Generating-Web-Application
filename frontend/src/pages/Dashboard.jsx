import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [currency, setCurrency] = useState("LKR");

  return (
    // dashboard-layout equivalent
    <div className="flex min-h-screen bg-[#f8f9fb]">
      
      {/* Your Sidebar Component */}
      <Navbar />

      {/* dashboard-content equivalent */}
      {/* ml-0 for mobile, ml-64 (256px) for desktop to make room for Navbar */}
      <main className="flex-1 mt-[70px] p-5 md:p-10 transition-all duration-300 ml-0 md:ml-64">
        

        
      </main>
    </div>
  );
}
