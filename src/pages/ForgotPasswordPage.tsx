import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import forgotPassIcon from "../assets/icons/forgot-pass.png";
import { ROUTES } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async () => {
    if (!input.trim()) {
      setError("Please enter your email or phone number");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Here you would typically make an API call to send the verification code
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the email/phone in sessionStorage to use it in verification page
      sessionStorage.setItem('resetEmail', input);
      
      // Navigate to verification page
      navigate(ROUTES.VERIFICATION);
    } catch (error) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b140e] px-4 pt-8">
      <div className="w-full max-w-xs mx-auto text-white">
        {/* Back Button + Heading */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-[#2b2420] hover:bg-[#3b3430] transition-colors mr-3"
          >
            <Icon icon="material-symbols:arrow-back-rounded" className="text-2xl text-white translate-y-0.5" />
          </button>
          <h1 className="text-2xl font-semibold">Forgot Password</h1>
          <div className="flex-1"></div>
        </div>

        {/* Illustration with glow effect */}
        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-300/20 rounded-full blur-xl transform scale-90"></div>
          <img
            src={forgotPassIcon}
            alt="Forgot Password Illustration"
            className="w-150 mx-auto relative z-10"
          />
        </div>

        {/* Subheading */}
        <h2 className="text-xl font-semibold mb-2 text-white text-center">Forgot Your Password?</h2>
        <p className="text-sm text-gray-300 mb-8 text-center">
          It generally happens, but no need to worry. Enter your registered mail
          id or phone number and we'll send you a code to reset your password.
        </p>

        {/* Input Field */}
        <div className="mb-10">
          <label className="block text-sm text-gray-300 mb-2.5 font-medium text-left pl-1">Email or Phone</label>
          <div className="relative">
            <Icon 
              icon="material-symbols:mail-outline-rounded" 
              className="absolute top-3.5 left-3.5 text-gray-400 text-xl" 
            />
            <input
              type="text"
              placeholder="Enter your email or phone number"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              className={`w-full pl-11 pr-4 py-3.5 rounded-3xl border ${
                error ? 'border-red-500' : 'border-gray-700'
              } bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all`}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>
          )}
        </div>

        {/* Next Button */}
        <button 
          className="w-full py-4 rounded-3xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center gap-2 shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendCode}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <>
              <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Code</span>
              <Icon icon="material-symbols:arrow-forward-rounded" className="text-xl" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}