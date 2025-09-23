// // Version 1.0 
// import React from "react";
// import { motion } from "framer-motion";
// import { Home, Map, PlusCircle, Users } from "lucide-react";
// import { Icon } from "@iconify/react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ROUTES } from "@/lib/constants";

// export function BottomNavigation() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const navItems = [
//     { id: "home", route: ROUTES.DASHBOARD, icon: <Home size={22} /> },
//     { id: "map", route: ROUTES.LIVE_HAZARD_MAP, icon: <Map size={22} /> },
//     { id: "create", route: ROUTES.DASHBOARD, icon: <PlusCircle size={22} /> },
//     { id: "community", route: ROUTES.DASHBOARD, icon: <Users size={22} /> },
//     {
//       id: "emergency",
//       route: ROUTES.EMERGENCY_MODE,
//       icon: <Icon icon="mdi:shield-plus" className="text-xl" />,
//     },
//   ];

//   // ✅ Find active item by exact match or best match
//   const activeItem =
//     navItems.find((item) => location.pathname === item.route)?.id || "home";

//   return (
//     <nav className="fixed bottom-4 left-0 right-0 z-50 px-4">
//       <div className="mx-auto max-w-md bg-[#2a211f]/85 backdrop-blur-lg rounded-full p-2 flex items-center justify-around shadow-lg border border-[#3a2f2d]">
//         {navItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => navigate(item.route)}
//             className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
//               activeItem === item.id ? "text-black" : "text-gray-300"
//             }`}
//           >
//             {activeItem === item.id && (
//               <motion.div
//                 layoutId="active-nav-indicator"
//                 className="absolute inset-0 bg-yellow-400 rounded-full z-0"
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               />
//             )}
//             <span className="relative z-10">{item.icon}</span>
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }


// Version 2.0 - Hovering Bug Fixed
import React from "react";
import { motion } from "framer-motion";
import { Home, Map, PlusCircle, Users } from "lucide-react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { flushSync } from "react-dom"; // Import flushSync

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", route: ROUTES.DASHBOARD, icon: <Home size={22} /> },
    { id: "map", route: ROUTES.LIVE_HAZARD_MAP, icon: <Map size={22} /> },
    { id: "create", route: ROUTES.CREATE_POST, icon: <PlusCircle size={22} /> },
    { id: "community", route: ROUTES.COMMUNITY, icon: <Users size={22} /> },
    {
      id: "emergency",
      route: ROUTES.EMERGENCY_MODE,
      icon: <Icon icon="mdi:shield-plus" className="text-xl" />,
    },
  ];

  const activeItem =
    navItems.find((item) => location.pathname === item.route)?.id || "home";

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-md bg-[#2a211f]/85 backdrop-blur-lg rounded-full p-2 flex items-center justify-around shadow-lg border border-[#3a2f2d]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              // ✅ MOST ROBUST FIX:
              // 1. Force an instant scroll to the top, ignoring any smooth-scroll CSS.
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
              });

              // 2. Use a minimal timeout to ensure the scroll registers before navigation.
              setTimeout(() => {
                 navigate(item.route);
              }, 0);
            }}
            className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              activeItem === item.id ? "text-black" : "text-gray-300"
            }`}
          >
            {activeItem === item.id && (
              <motion.div
                layoutId="active-nav-indicator"
                className="absolute inset-0 bg-yellow-400 rounded-full z-0"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}