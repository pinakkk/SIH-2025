// /// <reference types="@types/google.maps" />
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { motion } from "framer-motion";
// import { ArrowLeft } from "lucide-react";

// const darkMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#212121" }] },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
//   { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
//   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
//   { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
//   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
// ];

// export function HazardFullMapPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hazard, setHazard] = useState<any>(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
//   });

//   useEffect(() => {
//     async function fetchHazard() {
//       try {
//         const res = await fetch(
//           `https://sih-2025-l3ur.onrender.com/api/hotspot/${id}`
//         );
//         const data = await res.json();
//         if (data.success) setHazard(data.data);
//       } catch (err) {
//         console.error("Error fetching hazard:", err);
//       }
//     }
//     fetchHazard();
//   }, [id]);

//   if (!hazard) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-300">
//         Loading map...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#1f1816] min-h-screen text-white">
//       {/* Header */}
//       <motion.header className="sticky top-0 z-40 bg-[#2b2320]/60 backdrop-blur-md border-b border-[#3a2f2d] px-4 py-4 flex items-center gap-3">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
//         >
//           <ArrowLeft size={20} />
//         </button>
//         <h1 className="font-bold text-lg">Hazard Map</h1>
//       </motion.header>

//       {/* Fullscreen Map */}
//       {isLoaded && hazard.center?.coordinates?.length === 2 && (
//         <div className="w-full h-[calc(100vh-64px)]">
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             center={{
//               lat: hazard.center.coordinates[1],
//               lng: hazard.center.coordinates[0],
//             }}
//             zoom={15}
//             options={{ styles: darkMapStyle, disableDefaultUI: false }}
//           >
//             <Marker
//               position={{
//                 lat: hazard.center.coordinates[1],
//                 lng: hazard.center.coordinates[0],
//               }}
//             />
//           </GoogleMap>
//         </div>
//       )}
//     </div>
//   );
// }


/// <reference types="@types/google.maps" />
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
];

export function HazardFullMapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hazard, setHazard] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  useEffect(() => {
    async function fetchHazard() {
      try {
        const res = await fetch("https://sih-2025-l3ur.onrender.com/api/all-hotspot");
        const data = await res.json();

        if (data.success) {
          const found = data.data.find((h: any) => h._id === id);
          setHazard(found || null);
        }
      } catch (err) {
        console.error("Error fetching hazard:", err);
      }
    }
    fetchHazard();
  }, [id]);

  if (!hazard) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-300">
        Loading map...
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#1f1816] text-white min-h-screen">
      {/* Header */}
      <motion.header className="flex items-center gap-3 px-4 py-4 bg-[#2b2320]/60 backdrop-blur-md border-b border-[#3a2f2d] sticky top-0 z-40">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">Hazard Map</h1>
      </motion.header>

      {/* Map fills the remaining space */}
      <div className="flex-1 w-full">
        {isLoaded && hazard.center?.coordinates?.length === 2 && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: hazard.center.coordinates[1],
              lng: hazard.center.coordinates[0],
            }}
            zoom={15}
            options={{
              styles: darkMapStyle,
              disableDefaultUI: true,
              zoomControl: true,
              gestureHandling: "greedy", // ✅ better mobile touch gestures
            }}
          >
            <Marker
              position={{
                lat: hazard.center.coordinates[1],
                lng: hazard.center.coordinates[0],
              }}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

