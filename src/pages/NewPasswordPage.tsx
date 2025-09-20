import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import newPassIcon from "../assets/icons/new-pass.png";
import { ROUTES } from "@/lib/constants";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    // Validate passwords
    if (!password) {
      setError("Please enter a new password");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Here you would typically make an API call to reset the password
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to success page
      navigate(ROUTES.SUCCESS);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
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
            <Icon icon="mdi:arrow-left" className="text-2xl text-white" />
          </button>
          <h1 className="text-2xl font-semibold">New Password</h1>
          <div className="flex-1"></div>
        </div>

        {/* Illustration with glow effect */}
        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-300/20 rounded-full blur-xl transform scale-90"></div>
          <img
            src={newPassIcon}
            alt="New Password Illustration"
            className="w-66 mx-auto relative z-10"
          />
        </div>

        {/* Subheading */}
        <h2 className="text-xl font-semibold mb-2 text-white text-center">Create New Password</h2>
        <p className="text-sm text-gray-300 mb-8 text-center">
          Your new password must be different from previously used passwords.
        </p>

        {/* Input Fields */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2.5 font-medium text-left pl-1">New Password</label>
          <div className="relative">
            <Icon 
              icon="mdi:lock-outline" 
              className="absolute top-3.5 left-3.5 text-gray-400 text-xl" 
            />
            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full pl-11 pr-4 py-3.5 rounded-3xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>

        <div className="mb-10">
          <label className="block text-sm text-gray-300 mb-2.5 font-medium text-left pl-1">Confirm Password</label>
          <div className="relative">
            <Icon 
              icon="mdi:lock-outline" 
              className="absolute top-3.5 left-3.5 text-gray-400 text-xl" 
            />
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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

        {/* Reset Button */}
        <button 
          className="w-full py-4 rounded-3xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center gap-2 shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleResetPassword}
          disabled={isLoading || !password.trim() || !confirmPassword.trim()}
        >
          {isLoading ? (
            <>
              <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <span>Reset Password</span>
              <Icon icon="mdi:check-circle-outline" className="text-xl" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
