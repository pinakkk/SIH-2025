import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/lib/constants";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setError(null);
      await login({ email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b140e] bg-opacity-95 px-4">
      <div className="w-full max-w-sm text-white backdrop-blur-sm p-8 rounded-3xl border border-gray-800/50">
        {/* Heading */}
        <h1 className="text-center text-xl font-semibold mb-6 text-orange-100">Login</h1>

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/src/assets/icons/rescue-saathi.png"
            alt="Rescue Saathi Logo"
            className="w-24 h-24 mb-3"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text">RESCUE SAATHI</h2>
          <p className="text-sm text-gray-300 mt-2 text-center">
            India's First SocialApp For Disaster Safety
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">Email</label>
          <div className="relative">
            <Icon icon="mdi:email-outline" className="absolute top-3.5 left-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">Password</label>
          <div className="relative">
            <Icon icon="mdi:lock-outline" className="absolute top-3.5 left-3 text-gray-400 text-xl" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Remember me + Forgot Password */}
        <div className="flex items-center justify-between text-xs mb-7">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-orange-500 w-4 h-4" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-orange-400 hover:underline hover:text-orange-300">
            Forgot Password?
          </a>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-xs">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          disabled={isLoading || !email || !password}
          className={`w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center shadow-lg ${
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

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-xs text-gray-400">Or, sign in with</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-10 mb-6">
          <button className="text-blue-500 text-3xl hover:scale-110 transition-transform">
            <Icon icon="logos:facebook" />
          </button>
          <button className="text-green-500 text-3xl hover:scale-110 transition-transform">
            <Icon icon="logos:google-icon" />
          </button>
          <button className="text-gray-200 text-3xl hover:scale-110 transition-transform">
            <Icon icon="mdi:apple" />
          </button>
        </div>

        {/* Guest */}
        <p className="text-center text-sm mb-4">
          <a href="#" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">
            Continue as guest
          </a>
        </p>

        {/* Create Account */}
        <p className="text-center text-sm text-gray-400">
          New here? <a href="#" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">Create Account</a>
        </p>
      </div>
    </div>
  );
}
