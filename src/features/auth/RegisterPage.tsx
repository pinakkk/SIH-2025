// import { useState } from "react";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ROUTES } from "@/lib/constants";
// import AppLogo from "../../assets/icons/rescue-saathi.png";

// export function RegisterPage() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleRegister = async () => {
//     setLoading(true);
//     setErrorMsg("");

//     if (!navigator.geolocation) {
//       setErrorMsg("Geolocation is not supported by your browser");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const { data } = await axios.post(
//             "https://sih-2025-l3ur.onrender.com/api/registered",
//             {
//               username: name,
//               email,
//               password,
//               location: {
//                 type: "Point", // ✅ required for GeoJSON
//                 coordinates: [longitude, latitude], // ✅ [lng, lat] order
//               },
//             },
//             { withCredentials: true }
//           );

//           if (data.success) {
//             alert("✅ Registered Successfully!");
//             navigate(ROUTES.LOGIN);
//           } else {
//             setErrorMsg(data.message || "Registration failed");
//           }
//         } catch (err) {
//           if (axios.isAxiosError(err)) {
//             setErrorMsg(
//               err.response?.data?.message ||
//                 err.message ||
//                 "Something went wrong, please try again."
//             );
//           } else {
//             setErrorMsg("Unexpected error occurred. Please try again.");
//           }
//         } finally {
//           setLoading(false);
//         }
//       },
//       (error) => {
//         setErrorMsg(
//           "Location access denied. Please allow location to continue."
//         );
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1b140e] bg-opacity-95 px-4">
//       <div className="w-full max-w-sm text-white backdrop-blur-sm p-6 rounded-3xl border border-gray-800/50">
//         {/* Heading */}
//         <h1 className="text-center text-xl font-semibold mb-5 text-orange-100">
//           Sign Up
//         </h1>

//         {/* Logo + Title */}
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={AppLogo}
//             alt="Rescue Saathi Logo"
//             className="w-24 h-24 mb-2"
//           />
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text">
//             RESCUE SAATHI
//           </h2>
//           <p className="text-sm text-gray-300 mt-1 text-center">
//             India's First SocialApp For Disaster Safety
//           </p>
//         </div>

//         {/* Name Input */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-300 mb-1.5 font-medium pl-1">
//             Full Name
//           </label>
//           <div className="relative">
//             <Icon
//               icon="mdi:account-outline"
//               className="absolute top-3 left-3 text-gray-400 text-xl"
//             />
//             <input
//               type="text"
//               placeholder="Enter Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
//             />
//           </div>
//         </div>

//         {/* Email Input */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-300 mb-1.5 font-medium pl-1">
//             Email
//           </label>
//           <div className="relative">
//             <Icon
//               icon="mdi:email-outline"
//               className="absolute top-3 left-3 text-gray-400 text-xl"
//             />
//             <input
//               type="text"
//               placeholder="Email or Phone Number"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
//             />
//           </div>
//         </div>

//         {/* Password Input */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-300 mb-1.5 font-medium pl-1">
//             Password
//           </label>
//           <div className="relative">
//             <Icon
//               icon="mdi:lock-outline"
//               className="absolute top-3 left-3 text-gray-400 text-xl"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
//             />
//           </div>
//         </div>

//         {/* Error message */}
//         {errorMsg && <p className="text-red-400 text-xs mb-3">{errorMsg}</p>}

//         {/* Sign Up Button */}
//         <button
//           onClick={handleRegister}
//           disabled={loading}
//           className="w-full py-3.5 rounded-2xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
//         >
//           {loading ? "Signing Up..." : "Sign Up"}
//         </button>

//         {/* Divider */}
//         {/* <div className="flex items-center my-5">
//           <div className="flex-1 h-px bg-gray-700"></div>
//           <span className="px-3 text-xs text-gray-400">Or, sign up with</span>
//           <div className="flex-1 h-px bg-gray-700"></div>
//         </div> */}

//         {/* Social Login */}
//         {/* <div className="flex justify-center space-x-8 mb-5">
//           <button className="text-blue-500 text-3xl hover:scale-110 transition-transform">
//             <Icon icon="logos:facebook" />
//           </button>
//           <button className="text-green-500 text-3xl hover:scale-110 transition-transform">
//             <Icon icon="logos:google-icon" />
//           </button>
//           <button className="text-gray-200 text-3xl hover:scale-110 transition-transform">
//             <Icon icon="mdi:apple" />
//           </button>
//         </div> */}

//         {/* Login Redirect */}
//         <p className="text-center text-sm text-gray-400 mt-2">
//           Already have an account?
//           <a
//             onClick={() => navigate(ROUTES.LOGIN)}
//             className="text-orange-400 hover:text-orange-300 hover:underline ml-1 transition-colors cursor-pointer"
//           >
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "@/lib/constants";
import AppLogo from "../../assets/icons/rescue-saathi.png";

// Use environment variable for backend
const API_BASE_URL = "https://sih-2025-l3ur.onrender.com"
  // import.meta.env.VITE_API_URL || "http://localhost:5002";

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateInputs = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    return null;
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setErrorMsg("");
    const validationError = validateInputs();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const { data } = await axios.post(
            `${API_BASE_URL}/api/registered`,
            {
              username: name.trim(),
              email: email.trim(),
              password,
              location: {
                type: "Point", // ✅ required for GeoJSON
                coordinates: [longitude, latitude], // ✅ [lng, lat]
              },
            },
            { withCredentials: true }
          );

          if (data.success) {
            alert("✅ Registered Successfully!");
            navigate(ROUTES.LOGIN);
          } else {
            setErrorMsg(data.message || "Registration failed.");
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setErrorMsg(
              err.response?.data?.message ||
                err.message ||
                "Something went wrong. Please try again."
            );
          } else {
            setErrorMsg("Unexpected error occurred. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      },
      () => {
        setErrorMsg(
          "Location access denied. Please allow location to continue."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b140e] bg-opacity-95 px-4">
      <div className="w-full max-w-sm text-white backdrop-blur-sm p-6 rounded-3xl border border-gray-800/50">
        {/* Heading */}
        <h1 className="text-center text-xl font-semibold mb-5 text-orange-100">
          Sign Up
        </h1>

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={AppLogo}
            alt="Rescue Saathi Logo"
            className="w-24 h-24 mb-2"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text">
            RESCUE SAATHI
          </h2>
          <p className="text-sm text-gray-300 mt-1 text-center">
            India's First SocialApp For Disaster Safety
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} noValidate>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm text-gray-300 mb-1.5 font-medium pl-1"
            >
              Full Name
            </label>
            <div className="relative">
              <Icon
                icon="mdi:account-outline"
                className="absolute top-3 left-3 text-gray-400 text-xl"
              />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm text-gray-300 mb-1.5 font-medium pl-1"
            >
              Email
            </label>
            <div className="relative">
              <Icon
                icon="mdi:email-outline"
                className="absolute top-3 left-3 text-gray-400 text-xl"
              />
              <input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1.5 font-medium pl-1"
            >
              Password
            </label>
            <div className="relative">
              <Icon
                icon="mdi:lock-outline"
                className="absolute top-3 left-3 text-gray-400 text-xl"
              />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-700 bg-[#2b2420]/70 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p
              role="alert"
              className="text-red-400 text-xs mb-3"
            >
              {errorMsg}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-300 text-black flex items-center justify-center shadow-lg hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-400 mt-2">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate(ROUTES.LOGIN)}
            className="text-orange-400 hover:text-orange-300 hover:underline ml-1 transition-colors"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
