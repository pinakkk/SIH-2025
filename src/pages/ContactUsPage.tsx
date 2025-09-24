// // src/pages/ContactUsPage.tsx
// import { useState } from "react";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "@/lib/constants";

// export function ContactUsPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     issue: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.phone || !formData.issue) {
//       setError("Please fill in all fields");
//       return;
//     }

//     // Basic phone number validation
//     const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       setError("Please enter a valid phone number");
//       return;
//     }

//     try {
//       setError(null);
//       setIsSubmitting(true);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // In a real app, you would send this data to your backend
//       console.log("Contact form submitted:", formData);
      
//       setSuccess(true);
//       setFormData({ name: "", phone: "", issue: "" });
      
//       // Show success message for 3 seconds then redirect
//       setTimeout(() => {
//         navigate(ROUTES.DASHBOARD);
//       }, 3000);
      
//     } catch (err) {
//       setError("Failed to submit your request. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && e.target === e.currentTarget) {
//       handleSubmit();
//     }
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#1b140e] px-4">
//         <div className="w-full max-w-sm text-white p-8 rounded-3xl text-center">
//           <div className="flex flex-col items-center mb-6">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center mb-4">
//               <Icon icon="mdi:check-circle" className="text-4xl text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h1>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               Your message has been sent successfully. Our support team will get back to you shortly.
//             </p>
//           </div>
//           <div className="animate-pulse text-xs text-gray-400">
//             Redirecting to dashboard...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#1b140e] text-white px-4 py-8">
//       <div className="max-w-2xl mx-auto w-full space-y-8">
//         {/* Header */}
//         <div className="flex items-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2b2420] hover:bg-[#3b3430] text-white mr-3 transition-colors"
//           >
//             <Icon icon="mdi:arrow-left" className="text-xl" />
//           </button>
//           <h1 className="text-2xl font-semibold">Contact Us</h1>
//         </div>

//         {/* Logo + Title */}
//         <div className="flex flex-col items-center">
//           <img
//             src="/src/assets/icons/rescue-saathi.png"
//             alt="Rescue Saathi Logo"
//             className="w-24 h-24 mb-3 drop-shadow-lg"
//           />
//           <h2 className="text-xl font-bold bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] text-transparent bg-clip-text drop-shadow-md">
//             RESCUE SAATHI
//           </h2>
//           <p className="text-sm text-gray-300 mt-2 text-center">
//             We're here to help you 24/7
//           </p>
//         </div>

//         {/* Contact Form */}
//         <div className="space-y-6">
//           {/* Name Input */}
//           <div>
//             <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">
//               Full Name
//             </label>
//             <div className="relative">
//               <Icon
//                 icon="mdi:account-outline"
//                 className="absolute top-3.5 left-4 text-gray-300 text-xl"
//               />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 onKeyPress={handleKeyPress}
//                 className="w-full pl-12 pr-4 py-4 
//                            rounded-2xl 
//                            bg-[#2b2420] 
//                            border border-gray-700 
//                            text-sm text-white placeholder-gray-400 
//                            focus:outline-none focus:border-[#F57F01] focus:ring-1 focus:ring-[#F89103] transition-all"
//               />
//             </div>
//           </div>

//           {/* Phone Input */}
//           <div>
//             <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">
//               Phone Number
//             </label>
//             <div className="relative">
//               <Icon
//                 icon="mdi:phone-outline"
//                 className="absolute top-3.5 left-4 text-gray-300 text-xl"
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="+91 XXXXX XXXXX"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 onKeyPress={handleKeyPress}
//                 className="w-full pl-12 pr-4 py-4 
//                            rounded-2xl 
//                            bg-[#2b2420] 
//                            border border-gray-700 
//                            text-sm text-white placeholder-gray-400 
//                            focus:outline-none focus:border-[#F57F01] focus:ring-1 focus:ring-[#F89103] transition-all"
//               />
//             </div>
//           </div>

//           {/* Issue Description */}
//           <div>
//             <label className="block text-sm text-gray-300 mb-2 font-medium pl-1">
//               What's the issue?
//             </label>
//             <div className="relative">
//               <Icon
//                 icon="mdi:message-text-outline"
//                 className="absolute top-3.5 left-4 text-gray-300 text-xl"
//               />
//               <textarea
//                 name="issue"
//                 placeholder="Describe your issue or question in detail..."
//                 value={formData.issue}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full pl-12 pr-4 py-4 
//                            rounded-2xl 
//                            bg-[#2b2420] 
//                            border border-gray-700 
//                            text-sm text-white placeholder-gray-400 
//                            focus:outline-none focus:border-[#F57F01] focus:ring-1 focus:ring-[#F89103] transition-all
//                            resize-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="p-3 bg-red-400/10 border border-red-400/50 text-red-300 rounded-xl text-sm">
//             {error}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting || !formData.name || !formData.phone || !formData.issue}
//           className={`w-full py-4 rounded-3xl font-semibold 
//                       bg-gradient-to-r from-[#F57F01] via-[#F89103] to-[#FFC008] 
//                       text-black flex items-center justify-center shadow-lg 
//                       ${
//                         isSubmitting || !formData.name || !formData.phone || !formData.issue
//                           ? "opacity-70 cursor-not-allowed"
//                           : "hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
//                       }`}
//         >
//           {isSubmitting ? (
//             <>
//               <Icon icon="mdi:loading" className="animate-spin mr-2" />
//               Sending Message...
//             </>
//           ) : (
//             <>
//               <Icon icon="mdi:send" className="mr-2" />
//               Send Message
//             </>
//           )}
//         </button>

//         {/* Alternative Contact Methods
//         <div className="pt-6 border-t border-gray-700">
//           <p className="text-center text-sm text-gray-400 mb-4">
//             Or reach us directly
//           </p>
//           <div className="flex justify-center space-x-8">
//             <a
//               href="tel:+911800123456"
//               className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm"
//             >
//               <Icon icon="mdi:phone" className="text-lg" />
//               Call Us
//             </a>
//             <a
//               href="mailto:support@rescuesaathi.com"
//               className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
//             >
//               <Icon icon="mdi:email" className="text-lg" />
//               Email Us
//             </a>
//             <a
//               href="https://wa.me/911800123456"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors text-sm"
//             >
//               <Icon icon="mdi:whatsapp" className="text-lg" />
//               WhatsApp
//             </a>
//           </div>
//         </div> */}

      
//       </div>
//     </div>
//   );
// }





import React from 'react';
import { ArrowLeft, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ContactUsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] px-4 py-8 relative">
      <div className="w-full max-w-sm text-left backdrop-blur-2xl bg-[#1b140e]/95 border border-[#F57C00]/30 shadow-2xl p-8 rounded-[2rem] relative">

        {/* Header */}
        <header className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 mr-4 rounded-full hover:bg-[#F57C00]/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#FFC107]" />
          </button>
          <h1 className="text-xl font-bold text-[#FCFCFA] drop-shadow-md">Contact us</h1>
        </header>

        {/* Get in Touch */}
        <section className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-[#FFC107] mb-2">Get in Touch</h2>
          <p className="text-[#FFF3E0] text-sm mb-6">
            If you have any inquiries get in touch with us. <br />
            We’ll be happy to help you.
          </p>

          {/* Phone */}
          <div className="flex items-center justify-center gap-2 bg-[#FFEBB4]/20 border border-[#FFC107]/40 rounded-2xl p-3 mb-4">
            <Phone className="w-5 h-5 text-[#F57C00]" />
            <span className="text-[#FCFCFA] text-sm">+1 (917) 555-6789</span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 bg-[#FFF3E0]/20 border border-[#FFC107]/40 rounded-2xl p-3">
            <Mail className="w-5 h-5 text-[#F57C00]" />
            <span className="text-[#FCFCFA] text-sm">company.name.info@gmail.com</span>
          </div>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <h2 className="text-lg font-semibold text-[#FFC107] mb-4">Social Media</h2>

          <div className="flex items-center gap-3 mb-4">
            <Facebook className="w-5 h-5 text-[#F57C00]" />
            <p className="text-[#FFF3E0] text-sm text-left">
              Stay updated, connect, and engage with us on Facebook.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Instagram className="w-5 h-5 text-[#F57C00]" />
            <p className="text-[#FFF3E0] text-sm text-left">
              Explore our visual world and discover beauty of our brand.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Twitter className="w-5 h-5 text-[#F57C00]" />
            <p className="text-[#FFF3E0] text-sm text-left">
              Follow us for real-time updates and lively discussions.
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 bg-[#F57C00] text-[#111111] font-medium rounded-[2rem] p-3 shadow-lg hover:bg-[#FFC107] transition-all duration-300">
              <Facebook className="w-5 h-5" /> Follow on Facebook
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#FFC107] text-[#111111] font-medium rounded-[2rem] p-3 shadow-lg hover:bg-[#F57C00] transition-all duration-300">
              <Instagram className="w-5 h-5" /> Follow on Instagram
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#FFEBB4] text-[#111111] font-medium rounded-[2rem] p-3 shadow-lg hover:bg-[#FFF3E0] transition-all duration-300">
              <Twitter className="w-5 h-5" /> Follow on Twitter
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
