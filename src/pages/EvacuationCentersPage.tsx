import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { MapPin, ChevronDown, Search, Filter, Bookmark, Phone } from 'lucide-react';

// ✅ Skeleton Block
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

interface Facility {
  icon: string;
  name: string;
  available: boolean;
}

interface Shelter {
  id: string;
  name: string;
  type: 'Flood' | 'Cyclone' | 'Multipurpose';
  address: {
    locality: string;
    district: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
  distance: number;
  capacity: {
    total: number;
    available: number;
  };
  facilities: Facility[];
  contact: string;
  status: 'Active' | 'Full' | 'Closed' | 'Under maintenance';
  lastUpdated: string;
  languages: string[];
  isBookmarked?: boolean;
}

const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Balurghat Flood Shelter',
    type: 'Flood',
    address: {
      locality: 'Mouza: Dakra, JL No. 105',
      district: 'Balurghat, West Bengal',
      coordinates: {
        lat: 25.22,
        lng: 88.77
      }
    },
    distance: 2.3,
    capacity: {
      total: 200,
      available: 150
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:bowl-food-outline', name: 'Food', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true },
      { icon: 'solar:lamp-outline', name: 'Electricity', available: true },
      { icon: 'solar:medical-kit-outline', name: 'Medical Aid', available: true },
      { icon: 'solar:wheelchair-outline', name: 'Accessibility', available: true }
    ],
    contact: '+91 9876543210',
    status: 'Active',
    lastUpdated: '10 mins ago',
    languages: ['Bengali', 'Hindi', 'English']
  },
  {
    id: '2',
    name: 'Sabari Women Shelter',
    type: 'Multipurpose',
    address: {
      locality: 'Bagbazar',
      district: 'Kolkata, West Bengal',
      coordinates: {
        lat: 22.60,
        lng: 88.37
      }
    },
    distance: 3.5,
    capacity: {
      total: 100,
      available: 45
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:bowl-food-outline', name: 'Food', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true },
      { icon: 'solar:lamp-outline', name: 'Electricity', available: true },
      { icon: 'solar:medical-kit-outline', name: 'Medical Aid', available: false },
      { icon: 'solar:wheelchair-outline', name: 'Accessibility', available: true }
    ],
    contact: '+91 9876543211',
    status: 'Active',
    lastUpdated: '25 mins ago',
    languages: ['Bengali', 'Hindi']
  }
];

const additionalShelters: Shelter[] = [
  {
    id: '3',
    name: 'Vivekananda Primary School — Flood Shelter (Dakra)',
    type: 'Flood',
    address: {
      locality: 'Balurghat',
      district: 'Uttar Dinajpur, West Bengal',
      coordinates: {
        lat: 25.2268,
        lng: 88.7708
      }
    },
    distance: 5.0,
    capacity: {
      total: 200,
      available: 150
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true }
    ],
    contact: 'District Disaster Mgmt. Office',
    status: 'Active',
    lastUpdated: '1 hour ago',
    languages: ['Bengali', 'Hindi', 'English']
  },
  {
    id: '4',
    name: 'Hili Flood Shelter (GP Office / permanent shelter)',
    type: 'Flood',
    address: {
      locality: 'Hili',
      district: 'Uttar Dinajpur, West Bengal',
      coordinates: {
        lat: 25.2818,
        lng: 89.0054
      }
    },
    distance: 8.0,
    capacity: {
      total: 150,
      available: 100
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true }
    ],
    contact: 'District Disaster Mgmt. Office',
    status: 'Active',
    lastUpdated: '2 hours ago',
    languages: ['Bengali', 'Hindi']
  },
  {
    id: '5',
    name: 'Multipurpose Cyclone & Flood Shelter — Kendrapara block',
    type: 'Multipurpose',
    address: {
      locality: 'Kendrapara',
      district: 'Odisha',
      coordinates: {
        lat: 20.501,
        lng: 86.422
      }
    },
    distance: 12.0,
    capacity: {
      total: 300,
      available: 200
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true },
      { icon: 'solar:medical-kit-outline', name: 'Medical Aid', available: true }
    ],
    contact: 'Local Sarpanch',
    status: 'Active',
    lastUpdated: '3 hours ago',
    languages: ['Odia', 'Hindi', 'English']
  },
  {
    id: '6',
    name: 'MPCS — Puri / Khurda region shelter',
    type: 'Multipurpose',
    address: {
      locality: 'Puri',
      district: 'Odisha',
      coordinates: {
        lat: 19.813,
        lng: 85.831
      }
    },
    distance: 15.0,
    capacity: {
      total: 500,
      available: 300
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true },
      { icon: 'solar:medical-kit-outline', name: 'Medical Aid', available: true },
      { icon: 'solar:bowl-food-outline', name: 'Food', available: true }
    ],
    contact: 'District Collector',
    status: 'Active',
    lastUpdated: '4 hours ago',
    languages: ['Odia', 'Hindi', 'English']
  },
  {
    id: '7',
    name: 'Renovated Cyclone Shelter (Repalle / Guntur district)',
    type: 'Cyclone',
    address: {
      locality: 'Repalle',
      district: 'Guntur, Andhra Pradesh',
      coordinates: {
        lat: 16.018,
        lng: 80.829
      }
    },
    distance: 20.0,
    capacity: {
      total: 2000,
      available: 1500
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true },
      { icon: 'solar:medical-kit-outline', name: 'Medical Aid', available: true },
      { icon: 'solar:bowl-food-outline', name: 'Food', available: true },
      { icon: 'solar:lamp-outline', name: 'Electricity', available: true }
    ],
    contact: 'Local Committee',
    status: 'Active',
    lastUpdated: '5 hours ago',
    languages: ['Telugu', 'English']
  },
  {
    id: '8',
    name: 'Shelter Hubs — Kerala (shelter hub model / district hubs)',
    type: 'Multipurpose',
    address: {
      locality: 'Pathanamthitta',
      district: 'Kerala',
      coordinates: {
        lat: 9.264,
        lng: 76.787
      }
    },
    distance: 25.0,
    capacity: {
      total: 1000,
      available: 800
    },
    facilities: [
      { icon: 'fluent:water-24-regular', name: 'Water', available: true },
      { icon: 'solar:toilet-outline', name: 'Toilets', available: true },
      { icon: 'solar:medical-kit-outline', name: 'Medical Aid', available: true },
      { icon: 'solar:bowl-food-outline', name: 'Food', available: true },
      { icon: 'solar:lamp-outline', name: 'Electricity', available: true }
    ],
    contact: 'UNDP / State SDMA',
    status: 'Active',
    lastUpdated: '6 hours ago',
    languages: ['Malayalam', 'English']
  }
];

const EvacuationCentersPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'map' | 'list'>('list');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [shelters, setShelters] = useState<Shelter[]>(mockShelters);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShelters([...mockShelters, ...additionalShelters]);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  // Filter and search logic
  const filteredShelters = useMemo(() => {
    return shelters.filter(shelter => {
      // Type filter
      if (selectedType !== 'All' && shelter.type !== selectedType) {
        return false;
      }
      
      // Search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          shelter.name.toLowerCase().includes(searchLower) ||
          shelter.address.locality.toLowerCase().includes(searchLower) ||
          shelter.address.district.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    }).sort((a, b) => a.distance - b.distance); // Sort by distance
  }, [shelters, selectedType, searchQuery]);

  const handleBookmark = (shelterId: string) => {
    setShelters(shelters.map(shelter => 
      shelter.id === shelterId 
        ? { ...shelter, isBookmarked: !shelter.isBookmarked }
        : shelter
    ));
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  
  const handleSearch = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
    setSearchTimeout(timeout);
  };

  const filterTypes = ['All', 'Flood', 'Cyclone', 'Multipurpose'];

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-20">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 bg-[#2b2320]/85 backdrop-blur-md border-b border-[#3a2f2d] px-5 py-4"
      >
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a403d] transition-colors"
          >
            <Icon icon="solar:arrow-left-outline" className="text-xl text-[#d8cdc6]" />
          </motion.button>
          <h1 className="text-lg font-semibold">Evacuation Centers</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search shelters by name or area..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2.5 pl-11 rounded-xl bg-[#372a28] border border-[#3a2f2d] text-white placeholder-[#bfb2ac] focus:outline-none focus:border-orange-500 transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bfb2ac] w-5 h-5" />
        </div>
      </motion.header>

      {/* View Toggle & Filters */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-center mb-4">
          {/* View Toggle */}
          <div className="flex bg-[#2a2a2a] p-1 rounded-lg">
            <button
              onClick={() => setActiveView('list')}
              className={`px-4 py-1.5 rounded-md transition-all ${
                activeView === 'list'
                  ? 'bg-orange-500 text-white'
                  : 'text-[#bfb2ac] hover:text-white'
              }`}
            >
              <Icon icon="solar:list-outline" className="text-xl" />
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-4 py-1.5 rounded-md transition-all ${
                activeView === 'map'
                  ? 'bg-orange-500 text-white'
                  : 'text-[#bfb2ac] hover:text-white'
              }`}
            >
              <Icon icon="solar:map-outline" className="text-xl" />
            </button>
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2a] text-[#bfb2ac] hover:text-white transition-all"
          >
            <Filter size={18} />
            <span>Filters</span>
          </motion.button>
        </div>

        {/* Type Filter */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5"
          >
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#2a2a2a] text-[#bfb2ac] hover:bg-[#372a28]'
                }`}
              >
                {type}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Shelter List */}
      <div className="px-5">
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <SkeletonBlock key={i} className="h-48" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-4"
          >
            {filteredShelters.map((shelter) => (
              <motion.div
                key={shelter.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-[#2a2a2a] border border-[#3a2f2d] rounded-2xl p-4 shadow-lg"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{shelter.name}</h3>
                    <p className="text-sm text-[#bfb2ac] flex items-center gap-1">
                      <MapPin size={14} />
                      {shelter.address.locality}, {shelter.address.district}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBookmark(shelter.id)}
                    className={`p-2 rounded-full ${
                      shelter.isBookmarked
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-[#372a28] text-[#bfb2ac]'
                    }`}
                  >
                    <Bookmark size={18} className={shelter.isBookmarked ? 'fill-orange-400' : ''} />
                  </button>
                </div>

                {/* Status & Capacity */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      shelter.status === 'Active' ? 'bg-green-400' :
                      shelter.status === 'Full' ? 'bg-red-400' :
                      'bg-yellow-400'
                    }`} />
                    <span className="text-sm font-medium">{shelter.status}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-orange-400 font-semibold">
                      {shelter.capacity.available}
                    </span>
                    <span className="text-[#bfb2ac]">
                      /{shelter.capacity.total} beds available
                    </span>
                  </div>
                </div>

                {/* Facilities */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {shelter.facilities.map((facility, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        facility.available
                          ? 'bg-[#372a28] text-[#d8cdc6]'
                          : 'bg-[#2a2a2a] text-[#8b7e79] opacity-60'
                      }`}
                    >
                      <Icon icon={facility.icon} className="text-lg" />
                      <span className="text-xs">{facility.name}</span>
                    </div>
                  ))}
                </div>

                {/* Contact & Distance */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleCall(shelter.contact)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
                  >
                    <Phone size={16} />
                    <span className="text-sm">Call Center</span>
                  </button>
                  <div className="text-sm text-[#bfb2ac]">
                    {shelter.distance} km away
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EvacuationCentersPage;