// Version 3.0 - Cleaned (Direct API Call)
import { useState } from "react";
import { Icon } from "@iconify/react";
import { ROUTES } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppLogo from "../../assets/icons/rescue-saathi.png";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.post(
        "http://localhost:5002/api/login", // change to production url later
        { email, password },
        { withCredentials: true }
      );

      console.log("✅ Login Success:", data);

      // redirect to dashboard/home after login
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b140e] bg-opacity-95 px-0">
      <div className="w-full max-w-sm text-white backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl p-8 rounded-[2rem]">
        {/* Heading */}
        <h1 className="text-center text-xl font-semibold mb-2 text-orange-100 drop-shadow-md">
          Login
        </h1>

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={AppLogo}
            alt="Rescue Saathi Logo"
            className="w-32 h-32 mb-0 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] text-transparent bg-clip-text drop-shadow-md">
            RESCUE SAATHI
          </h2>
          <p className="text-sm text-gray-300 mt-2 text-center">
            India's First SocialApp For Disaster Safety
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">
            Email
          </label>
          <div className="relative">
            <Icon
              icon="mdi:email-outline"
              className="absolute top-3.5 left-4 text-gray-300 text-xl"
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-4 
                         rounded-[2rem] 
                         bg-black/20 backdrop-blur-xl 
                         border border-white/10 
                         text-sm text-white placeholder-gray-400 
                         focus:outline-none focus:border-[#F57F01] focus:ring-1 focus:ring-[#F89103] transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">
            Password
          </label>
          <div className="relative">
            <Icon
              icon="mdi:lock-outline"
              className="absolute top-3.5 left-4 text-gray-300 text-xl"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-4 
                         rounded-[2rem] 
                         bg-black/20 backdrop-blur-xl 
                         border border-white/10 
                         text-sm text-white placeholder-gray-400 
                         focus:outline-none focus:border-[#F57F01] focus:ring-1 focus:ring-[#F89103] transition-all"
            />
          </div>
        </div>

        {/* Remember me + Forgot Password */}
        <div className="flex items-center justify-between text-xs mb-7">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-[#F57F01] w-4 h-4" />
            <span>Remember me</span>
          </label>
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.FORGOT_PASSWORD);
            }}
            href="#"
            className="text-[#F89103] hover:underline hover:text-[#FFC008] cursor-pointer"
          >
            Forgot Password?
          </a>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 bg-red-400/10 border border-red-400/50 text-red-300 rounded-xl text-xs backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading || !email || !password}
          className={`w-full py-4 rounded-[2rem] font-semibold 
                      bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] 
                      text-black flex items-center justify-center shadow-lg 
                      backdrop-blur-md ${
                        isLoading || !email || !password
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                      }`}
        >
          {isLoading ? (
            <>
              <Icon icon="mdi:loading" className="animate-spin mr-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Guest */}
        <p className="text-center text-sm mb-4">
          <a
            href="#"
            className="text-[#F89103] hover:text-[#FFC008] hover:underline transition-colors"
          >
            Continue as guest
          </a>
        </p>

        {/* Create Account */}
        <p className="text-center text-sm text-gray-400">
          New here?{" "}
          <a
            onClick={() => navigate(ROUTES.REGISTER)}
            className="text-[#F89103] hover:text-[#FFC008] hover:underline transition-colors cursor-pointer"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
