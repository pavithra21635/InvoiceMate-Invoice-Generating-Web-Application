import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import loginImage from "../assets/loginpageimage.png";
import logo from "../assets/Logo.png";


export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/dashboard");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-[#E1C6FC] overflow-hidden">
        
        <div className="bg-white p-8 rounded-[5px] shadow-lg w-full max-w-[532px] min-h-[692px] z-10">
            <img className="block mx-auto h-32 w-[550px] h-[550px]" src={logo} alt="Logo" />
        </div>

        <img 
            className="hidden md:block rounded-[5px] shadow-lg w-full max-w-[632px] h-[692px] object-cover -ml-4" 
            src={loginImage} 
            alt="Login Illustration" 
        />
        </div>
    );
}