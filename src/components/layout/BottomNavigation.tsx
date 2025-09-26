// // Improved UI 
// import React, { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Home, Map, PlusCircle, Users } from "lucide-react";
// import { Icon } from "@iconify/react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ROUTES } from "@/lib/constants";

// export function BottomNavigation() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navigationRef = useRef<HTMLDivElement>(null);
  
//   const navItems = [
//     { id: "home", route: ROUTES.DASHBOARD, icon: <Home size={22} /> },
//     { id: "map", route: ROUTES.LIVE_HAZARD_MAP, icon: <Map size={22} /> },
//     { id: "create", route: ROUTES.CREATE_POST, icon: <PlusCircle size={22} /> },
//     { id: "community", route: ROUTES.COMMUNITY, icon: <Users size={22} /> },
//     {
//       id: "emergency",
//       route: ROUTES.EMERGENCY_MODE,
//       icon: <Icon icon="mdi:shield-plus" className="text-xl" />,
//     },
//   ];

//   const activeItem =
//     navItems.find((item) => location.pathname === item.route)?.id || "home";

//   // ✅ Scroll to top immediately and prevent layout shifts
//   useEffect(() => {
//     // Use requestAnimationFrame to ensure DOM has updated
//     requestAnimationFrame(() => {
//       window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      
//       // Force a layout calculation to prevent animation jitter
//       if (navigationRef.current) {
//         navigationRef.current.getBoundingClientRect();
//       }
//     });
//   }, [location.pathname]);

//   const handleNavigation = (route: string) => {
//     // Scroll to top immediately before navigation to prevent animation issues
//     window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
//     navigate(route);
//   };

//   return (
//     <nav className="fixed bottom-4 left-0 right-0 z-50 px-4">
//       <motion.div
//         ref={navigationRef}
//         layout
//         className="mx-auto max-w-md bg-[#1d1614]/90 backdrop-blur-xl rounded-full p-2 flex items-center justify-around shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[#3a2f2d]"
//       >
//         {navItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => handleNavigation(item.route)}
//             className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
//               activeItem === item.id
//                 ? "text-black"
//                 : "text-gray-300 hover:text-white"
//             }`}
//           >
//             {activeItem === item.id && (
//               <motion.div
//                 layoutId="active-nav-indicator"
//                 className="absolute inset-0 bg-gradient-to-b from-[#f89e2c] to-[#f37306] rounded-full shadow-[0_0_15px_rgba(248,157,44,0.7)]"
//                 transition={{ 
//                   type: "spring", 
//                   stiffness: 350, 
//                   damping: 25,
//                   duration: 0.3
//                 }}
//                 initial={false}
//               />
//             )}
//             <span className="relative z-10">{item.icon}</span>
//           </button>
//         ))}
//       </motion.div>
//     </nav>
//   );
// }



// BottomNavigation fixed icon visibility for Light & Dark
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Map, PlusCircle, Users } from "lucide-react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      if (navigationRef.current) {
        navigationRef.current.getBoundingClientRect();
      }
    });
  }, [location.pathname]);

  const handleNavigation = (route: string) => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    navigate(route);
  };

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <motion.div
        ref={navigationRef}
        layout
        className="
          mx-auto max-w-md 
          rounded-full p-2 flex items-center justify-around
          backdrop-blur-xl backdrop-saturate-150
          bg-white/70 border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.1)]
          dark:bg-[#1d1614]/70 dark:border-[#3a2f2d] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]
        "
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.route)}
            className={`
              relative w-12 h-12 flex items-center justify-center rounded-full 
              transition-all duration-300
              ${
                activeItem === item.id
                  ? "text-black dark:text-white"
                  : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              }
            `}
          >
            {activeItem === item.id && (
              <motion.div
                layoutId="active-nav-indicator"
                className="
                  absolute inset-0 
                  bg-gradient-to-b from-[#f89e2c] to-[#f37306] 
                  rounded-full
                  shadow-[0_0_12px_rgba(248,157,44,0.4)]
                  dark:shadow-[0_0_20px_rgba(248,157,44,0.7)]
                "
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                  duration: 0.3,
                }}
                initial={false}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
          </button>
        ))}
      </motion.div>
    </nav>
  );
}
