import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { useTheme } from "@/hooks/use-theme";

export function NgoOfficial() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    registrationNumber: "",
    website: "",
    established: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    address: "",
    areasOfWork: [] as string[],
    description: "",
  });
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);
  const [taxExemptionDoc, setTaxExemptionDoc] = useState<File | null>(null);

  const areasOfWorkOptions = [
    "Disaster Relief",
    "Healthcare",
    "Education",
    "Environment",
    "Child Welfare",
    "Women Empowerment",
    "Rural Development",
    "Elderly Care",
    "Animal Welfare",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => {
      const currentAreas = [...prev.areasOfWork];
      if (currentAreas.includes(area)) {
        return {
          ...prev,
          areasOfWork: currentAreas.filter((item) => item !== area),
        };
      } else {
        return {
          ...prev,
          areasOfWork: [...currentAreas, area],
        };
      }
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "registration" | "taxExemption"
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === "registration") {
        setRegistrationDoc(e.target.files[0]);
      } else {
        setTaxExemptionDoc(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would upload files and submit form data to your backend
      console.log("Form data:", formData);
      console.log("Registration Document:", registrationDoc);
      console.log("Tax Exemption Document:", taxExemptionDoc);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to success page or show success message
      alert(
        "Verification request submitted successfully! You will be notified once your request is reviewed."
      );
      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.error("Error submitting verification request:", error);
      alert("Failed to submit verification request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#1f1816] min-h-screen text-gray-900 dark:text-white font-sans">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/70 dark:bg-[#2b2320]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#3a2f2d]/50 px-5 py-4"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-gray-600 dark:text-[#d8cdc6] hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#372a28]/80 hover:bg-gray-200 dark:hover:bg-[#443331] transition">
              <ArrowLeft size={16} />
            </div>
          </motion.button>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
          >
            Verify as NGO
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
          <h2 className="text-xl font-semibold mb-2">NGO Verification</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please fill out the form below to verify your organization as a recognized NGO.
            All information will be reviewed by our team for authenticity.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <h3 className="text-md font-semibold text-yellow-400">Organization Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organization Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Full legal name of your organization"
                />
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="NGO registration number"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Website (Optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="https://yourorganization.org"
                />
              </div>

              {/* Year Established */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Year Established</label>
                <input
                  type="text"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Year your NGO was established"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Registered Office Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Full address of your registered office"
              />
            </div>

            <h3 className="text-md font-semibold text-yellow-400 pt-2">Contact Person Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Person */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Contact Person Name</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Name of primary contact person"
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Position in the organization"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Official email address"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="Contact phone number"
                />
              </div>
            </div>

            <h3 className="text-md font-semibold text-yellow-400 pt-2">Organization Information</h3>
            
            {/* Areas of Work */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Areas of Work (Select all that apply)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {areasOfWorkOptions.map((area) => (
                  <div key={area} className="flex items-center">
                    <input
                      type="checkbox"
                      id={area}
                      checked={formData.areasOfWork.includes(area)}
                      onChange={() => handleCheckboxChange(area)}
                      className="w-4 h-4 rounded accent-yellow-500 mr-2"
                    />
                    <label htmlFor={area} className="text-sm text-gray-800 dark:text-gray-100">
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Organization Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2320] border border-gray-300 dark:border-[#3a2f2d] focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Brief description of your organization's mission, vision and activities"
              />
            </div>

            <h3 className="text-md font-semibold text-yellow-400 pt-2">Document Upload</h3>

            {/* Registration Document */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Registration Certificate</label>
              <div className="border border-dashed border-gray-300 dark:border-[#3a2f2d] rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#2a2320]/50 transition cursor-pointer">
                <input
                  type="file"
                  id="registrationDoc"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "registration")}
                  required
                  className="hidden"
                />
                <label
                  htmlFor="registrationDoc"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload size={24} className="text-yellow-500 mb-2" />
                  <span className="text-sm font-medium">
                    {registrationDoc
                      ? registrationDoc.name
                      : "Upload NGO registration certificate"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to browse or drop files here</span>
                </label>
              </div>
            </div>

            {/* Tax Exemption Document */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Tax Exemption Certificate (Optional)</label>
              <div className="border border-dashed border-gray-300 dark:border-[#3a2f2d] rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#2a2320]/50 transition cursor-pointer">
                <input
                  type="file"
                  id="taxExemption"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "taxExemption")}
                  className="hidden"
                />
                <label
                  htmlFor="taxExemption"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload size={24} className="text-yellow-500 mb-2" />
                  <span className="text-sm font-medium">
                    {taxExemptionDoc
                      ? taxExemptionDoc.name
                      : "Upload tax exemption certificate (if available)"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to browse or drop files here</span>
                </label>
              </div>
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

        <div className="mt-6 text-xs text-gray-500 dark:text-gray-500 text-center">
          By submitting this form, you certify that all information provided is accurate and complete.
          False information may lead to rejection of verification and other consequences.
        </div>
      </div>
    </div>
  );
}