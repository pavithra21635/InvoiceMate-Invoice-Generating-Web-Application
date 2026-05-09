import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  MdDashboard, 
  MdReceipt, 
  MdInsertDriveFile, 
  MdLogout, 
  MdMenu, 
  MdClose,
} from "react-icons/md";
import logo from "../assets/Logo.png";


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  
  const getLinkStyle = (path) => {

  const baseStyle = "flex items-center px-6 py-3 mx-4 my-2 border-1.5 rounded-lg font-medium transition-all duration-300 font-sans";
  const activeStyle = "bg-[#9F29B5] text-white border-[#9F29B5] shadow-lg shadow-[#9F29B5]/20";
  const inactiveStyle = "text-black border-[#E1C6FC] hover:border-[#9F29B5] hover:bg-[#FBF5FF]";
  
  return `${baseStyle} ${location.pathname === path ? activeStyle : inactiveStyle}`;
};

  return (
    <>
      
      <header className="fixed top-0 left-0 w-full h-[90px] bg-white flex justify-between items-center px-6 border-b border-[#D9D9D9] z-[1000]">
        
        <div className="flex items-center gap-4">
         
          <div 
            className="md:hidden flex text-3xl cursor-pointer hover:scale-110 hover:text-[#9F29B5] transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
          </div>
          
          <img src={logo} alt="Logo" className="h-[70px] w-[70px]" />
          <span className="hidden sm:block font-['Arial',_Helvetica,_sans-serif] font-semibold text-[23px] tracking-tight">
            INVOICE MATE
          </span>
        </div>
        
    
      </header>

     
      <nav className={`
        fixed left-0 top-[90px] h-[calc(100vh-90px)] bg-white border-r border-[#D9D9D9] 
        flex flex-col justify-between py-5 transition-all duration-300 z-[999]
        ${isMobileMenuOpen ? "left-0 w-[240px]" : "-left-full md:left-0 md:w-[260px] lg:w-[260px]"}
        ${/* Tablet collapse logic */ ""}
        md:max-lg:w-[80px]
      `}>

        <div className="pt-4">
          <Link to="/dashboard" className={getLinkStyle("/dashboard")}>
            <MdDashboard className="text-xl mr-4" />
            <span className="md:max-lg:hidden" >Dashboard</span>
          </Link>

                
        <Link to="/invoices" className={getLinkStyle("/invoices")}>
            <MdReceipt className="text-xl mr-4" />
            <span className="md:max-lg:hidden">Invoices</span>
        </Link>

       
        <Link to="/drafts" className={getLinkStyle("/drafts")}>
            <MdInsertDriveFile className="text-xl mr-4" />
            <span className="md:max-lg:hidden">Drafts</span>
        </Link>
        </div>

        <div className="pb-8">
          <Link to="/" className="flex items-center px-6 py-3 mx-4 text-[#333] font-medium border-t border-gray-100 font-['Arial',_Helvetica,_sans-serif] hover:text-[#9F29B5]">
            <MdLogout className="text-xl mr-4" />
            <span className="md:max-lg:hidden">Logout</span>
          </Link>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[998] md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}