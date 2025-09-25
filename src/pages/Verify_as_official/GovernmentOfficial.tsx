import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { Icon } from "@iconify/react";

export function GovernmentOfficial() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    department: "",
    employeeId: "",
    email: "",
    phone: "",
    address: "",
  });
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [authLetterFile, setAuthLetterFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "idCard" | "authLetter") => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === "idCard") {
        setIdCardFile(e.target.files[0]);
      } else {
        setAuthLetterFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would upload files and submit form data to your backend
      console.log("Form data:", formData);
      console.log("ID Card:", idCardFile);
      console.log("Authorization Letter:", authLetterFile);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Redirect to success page or show success message
      alert("Verification request submitted successfully! You will be notified once your request is reviewed.");
      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.error("Error submitting verification request:", error);
      alert("Failed to submit verification request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-[#2b2320]/95 backdrop-blur-md border-b border-[#3a2f2d]/50 px-5 py-4"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-[#d8cdc6] hover:text-white transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition">
              <ArrowLeft size={16} />
            </div>
          </motion.button>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2"
          >
            <Icon icon="mdi:government" className="text-lg text-yellow-400" />
            Verify as Government Official
          </motion.h1>

          <div className="w-10 h-10"></div>
        </div>
      </motion.div>

      {/* Form Content */}
      <div className="container mx-auto px-5 py-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">Government Official Verification</h2>
          <p className="text-sm text-gray-400">
            Please fill out the form below to verify your status as a government official. 
            All information will be reviewed by our team for authenticity.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Enter your full name"
              />
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Your designation/position"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Your department/ministry"
              />
            </div>

            {/* Employee ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Your employee ID number"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Official Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Your official email address"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Your contact number"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Office Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-[#2a2320] border border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              placeholder="Your office address"
            />
          </div>

          {/* ID Card Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Government ID Card</label>
            <div className="border border-dashed border-[#3a2f2d] rounded-lg p-4 hover:bg-[#2a2320]/50 transition cursor-pointer">
              <input
                type="file"
                id="idCard"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, "idCard")}
                required
                className="hidden"
              />
              <label htmlFor="idCard" className="cursor-pointer flex flex-col items-center justify-center">
                <Upload size={24} className="text-yellow-500 mb-2" />
                <span className="text-sm font-medium">
                  {idCardFile ? idCardFile.name : "Upload your government ID card"}
                </span>
                <span className="text-xs text-gray-400 mt-1">Click to browse or drop files here</span>
              </label>
            </div>
          </div>

          {/* Authorization Letter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Authorization Letter (Optional)</label>
            <div className="border border-dashed border-[#3a2f2d] rounded-lg p-4 hover:bg-[#2a2320]/50 transition cursor-pointer">
              <input
                type="file"
                id="authLetter"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, "authLetter")}
                className="hidden"
              />
              <label htmlFor="authLetter" className="cursor-pointer flex flex-col items-center justify-center">
                <Upload size={24} className="text-yellow-500 mb-2" />
                <span className="text-sm font-medium">
                  {authLetterFile ? authLetterFile.name : "Upload authorization letter (if any)"}
                </span>
                <span className="text-xs text-gray-400 mt-1">Click to browse or drop files here</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold text-sm hover:opacity-90 transition flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Verification Request"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          By submitting this form, you certify that all information provided is accurate and complete.
          False information may lead to rejection of verification and other consequences.
        </div>
      </div>
    </div>
  );
}