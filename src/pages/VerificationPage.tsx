import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import verifyCodeImage from "@/assets/icons/verify-code.png";
import { ROUTES } from "@/lib/constants";

export default function VerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");

  // Get email/phone from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmailOrPhone(storedEmail);
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle resend code
  const handleResendCode = async () => {
    if (timeLeft > 0) return;
    
    setIsLoading(true);
    try {
      // Here you would make an API call to resend the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeLeft(30); // Reset timer
    } catch (error) {
      console.error("Failed to resend code", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        (nextInput as HTMLInputElement)?.focus();
      }
    }
  };

  // Handle verification
  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 4) return;
    
    setIsLoading(true);
    try {
      // Here you would make an API call to verify the code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful verification, navigate to new password page
      console.log('Code verified successfully:', code);
      navigate(ROUTES.NEW_PASSWORD);
    } catch (error) {
      console.error("Failed to verify code", error);
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
          <h1 className="text-2xl font-semibold">Verification</h1>
          <div className="flex-1"></div>
        </div>

        {/* Illustration with glow effect */}
        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-300/20 rounded-full blur-xl transform scale-90"></div>
          <img
            src={verifyCodeImage}
            alt="Verification Illustration"
            className="w-66 mx-auto relative z-10"
          />
        </div>

        {/* Subheading */}
        <h2 className="text-xl font-semibold mb-2 text-white text-center">Enter Verification Code</h2>
        <p className="text-sm text-gray-300 mb-8 text-center">
          We sent a 4 digit verification code to your registered email/phone
          number. To proceed, enter it here to confirm your identity.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              maxLength={1}
              className="w-14 h-14 text-center text-xl font-semibold rounded-xl bg-[#2b2420]/70 border border-gray-700 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          ))}
        </div>

        {/* Timer with Resend option */}
        <div className="text-sm text-center mb-10">
          {timeLeft > 0 ? (
            <p className="text-gray-400">
              Resend code in <span className="font-medium text-orange-500">{timeLeft}s</span>
            </p>
          ) : (
            <button 
              onClick={handleResendCode} 
              className="text-orange-500 font-medium hover:text-orange-400 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon icon="eos-icons:loading" className="inline mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </button>
          )}
          {emailOrPhone && (
            <p className="mt-1 text-xs text-gray-500">
              Code sent to {emailOrPhone.includes('@') ? emailOrPhone : 
                emailOrPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')}
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button 
          className="w-full py-4 rounded-3xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center gap-2 shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:transform-none disabled:hover:shadow-lg"
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 4}
        >
          {isLoading ? (
            <>
              <Icon icon="eos-icons:loading" className="text-xl animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify Code</span>
              <Icon icon="mdi:arrow-right" className="text-xl" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
