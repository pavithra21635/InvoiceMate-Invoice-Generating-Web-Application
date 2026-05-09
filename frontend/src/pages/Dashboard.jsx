import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [currency, setCurrency] = useState("LKR");

  return (
    
    <div className="flex min-h-screen bg-[#f8f9fb]">
      
      <Navbar />

      <main className="flex-1 mt-[70px] p-5 md:p-10 transition-all duration-300 ml-0 md:ml-64">
        
      </main>
    </div>
  );
}
