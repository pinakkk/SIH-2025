import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import successIcon from '@/assets/icons/success-icon.png';
import { ROUTES } from '@/lib/constants';

export default function SuccessPage() {
  const navigate = useNavigate();
  
  const handleGoToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
<div className="min-h-screen bg-[#1b140e] px-4 pt-12">
  <div className="w-full max-w-md mx-auto text-white text-center">
    {/* Back Button */}
    <div className="flex items-center mb-10">
      <button 
        onClick={() => navigate(-1)}
        className="p-3 rounded-full bg-[#2b2420] hover:bg-[#3b3430] transition-colors"
      >
        <Icon icon="mdi:arrow-left" className="text-3xl text-white" />
      </button>
      <div className="flex-1"></div>
    </div>

    {/* Illustration with glow effect */}
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-yellow-300/30 rounded-full blur-2xl transform scale-95"></div>
      <img
        src={successIcon}
        alt="Success Illustration"
        className="max-w-[320px] w-full mx-auto relative z-10" // much bigger
      />
    </div>

    {/* Success Message */}
    <div className="space-y-5 mb-12">
      <h2 className="text-3xl font-bold text-white">🎉 Congratulations!</h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        Your password has been reset successfully. <br />
        Use your new password to access your account.
      </p>
    </div>

    {/* Login Button */}
    <button 
      className="w-full py-4 rounded-3xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center gap-2 shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleGoToLogin}
    >
      <span>Back to Login</span>
      <Icon icon="mdi:arrow-right" className="text-2xl" />
    </button>
  </div>
</div>

  );
}
