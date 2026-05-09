import { Link } from "react-router-dom";
import loginImage from "../assets/loginpageimage.png";
import logo from "../assets/Logo.png";


export default function LoginPage() {
  return (
    // login-page equivalent: flex-row, centered, full screen
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-[#E1C6FC] overflow-hidden">
      
      {/* login-section */}
      <div className="bg-white p-8 rounded-[5px] shadow-lg w-full max-w-[532px] min-h-[692px] z-10">
        <img className="block mx-auto h-32 w-[550px] h-[550px]" src={logo} alt="Logo" />
        
        
      
       
      </div>

      {/* login-image-section (Hidden on small mobile, visible on tablet/desktop) */}
      <img 
        className="hidden md:block rounded-[5px] shadow-lg w-full max-w-[632px] h-[692px] object-cover -ml-4" 
        src={loginImage} 
        alt="Login Illustration" 
      />
    </div>
  );
}