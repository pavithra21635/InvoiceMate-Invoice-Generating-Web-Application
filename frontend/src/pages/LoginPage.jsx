import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import loginImage from "../assets/loginpageimage.png";
import logo from "../assets/Logo.png";


export default function LoginPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/dashboard");
    };

    

    return (
        
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-[#E1C6FC] p-4 md:p-8 overflow-y-auto">

            <div className="bg-white p-6 sm:p-10 md:p-12 rounded-lg shadow-lg w-full max-w-[532px] min-h-fit md:min-h-[600px] z-10 flex flex-col justify-center items-center relative">
                
               
                <img 
                    className="block mx-auto w-48 sm:w-64 md:w-[350px] h-auto mb-6 md:mb-10" 
                    src={logo} 
                    alt="Logo" 
                />

                <div className="text-center space-y-4 md:space-y-6 w-full max-w-sm">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-sans leading-tight">
                        Welcome to Invoice Mate
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 font-sans tracking-tight">
                        Streamline your invoicing process with our split-screen editor and live preview.
                    </p>

                    <button 
                        onClick={handleGetStarted}
                        className="w-full bg-[#9F29B5] text-white py-3 md:py-4 px-6 rounded-lg font-bold text-base md:text-lg shadow-md hover:bg-[#8e24a3] transition-all transform hover:scale-[1.02] active:scale-95 duration-200 mt-4 md:mt-8"
                    >
                        Get Started
                    </button>
                </div>
            </div>

           
            <img 
                
                className="hidden md:block rounded-r-lg shadow-lg w-full md:w-1/2 max-w-[600px] h-[400px] md:h-[600px] lg:h-[692px] object-cover" 
                src={loginImage} 
                alt="Login Illustration" 
            />
        </div>
    );
}