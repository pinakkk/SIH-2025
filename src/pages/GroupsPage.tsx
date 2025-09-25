import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  MapPin,
  Menu,
  Users,
  ArrowLeft,
  Search,
  UserPlus,
  Filter,
  MessageSquare,
  Bell
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { NotificationButton, NotificationPanel } from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

// Types
interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  avatar: string;
  description: string;
  isJoined: boolean;
  category: string;
  location: string;
  posts: number;
  lastActive: string;
}

// Skeleton component
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

export function GroupsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);

  // Notification hook
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteNotification,
  } = useNotifications();

  // Categories
  const categories = ["All", "Disaster Relief", "Emergency Response", "Support Groups", "Local Communities"];

  // Handle scroll effect
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('https://api.example.com/groups');
        // const data = await response.json();
        // setGroups(data);

        // Mock data
        setTimeout(() => {
          setGroups([
            {
              id: "1",
              name: "Odisha Coast Safety Network",
              members: 1245,
              avatar: "https://i.imgur.com/dmrZcV6.png",
              description: "Updates and support for coastal areas of Odisha during emergencies. Join us to stay informed and help your community.",
              isJoined: false,
              category: "Disaster Relief",
              location: "Odisha",
              posts: 156,
              lastActive: "2 minutes ago"
            },
            {
              id: "2",
              name: "Kerala Flood Relief Group",
              members: 2873,
              avatar: "https://i.imgur.com/nIYWAQZ.png",
              description: "Connecting volunteers with people in need during Kerala floods. Immediate assistance and resource coordination.",
              isJoined: true,
              category: "Emergency Response",
              location: "Kerala",
              posts: 324,
              lastActive: "5 minutes ago"
            },
            {
              id: "3",
              name: "Chennai Rescue Network",
              members: 989,
              avatar: "https://i.imgur.com/j5rD8KL.png",
              description: "Real-time updates and coordination for Chennai rescue efforts. Emergency contacts and resource sharing.",
              isJoined: false,
              category: "Disaster Relief",
              location: "Chennai",
              posts: 89,
              lastActive: "12 minutes ago"
            },
            {
              id: "4",
              name: "Mumbai Safety Community",
              members: 1567,
              avatar: "https://i.imgur.com/AYp2z2A.png",
              description: "Local community group for Mumbai residents. Weather alerts, safety tips, and emergency coordination.",
              isJoined: false,
              category: "Local Communities",
              location: "Mumbai",
              posts: 245,
              lastActive: "1 hour ago"
            },
            {
              id: "5",
              name: "Cyclone Support Group",
              members: 734,
              avatar: "https://i.imgur.com/nIYWAQZ.png",
              description: "Support group for those affected by cyclones. Resources, mental health support, and recovery assistance.",
              isJoined: false,
              category: "Support Groups",
              location: "West Bengal",
              posts: 67,
              lastActive: "3 hours ago"
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Filter groups based on search and category
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || group.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle join/leave group
  const handleJoinGroup = (groupId: string) => {
    setGroups(groups => groups.map(group => {
      if (group.id === groupId) {
        return { ...group, isJoined: !group.isJoined };
      }
      return group;
    }));
  };

  return (
    <div className="bg-[#1f1816] min-h-screen text-white font-sans pb-28">
      {/* Sticky Header */}
      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.6)"
            : "0 2px 6px rgba(0,0,0,0.25)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4"
      >
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
            >
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="font-bold text-lg">Community Groups</h1>
              <p className="text-sm text-[#d8cdc6] flex items-center">
                <Users size={14} className="mr-1" />
                Discover & Join Groups
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <NotificationButton
              unreadCount={unreadCount}
              onClick={() => setNotificationPanelOpen(true)}
            />
            <button
              onClick={() => setProfileSidebarOpen(true)}
              className="flex items-center"
            >
              <img
                src={user?.photoURL || "https://i.pravatar.cc/40"}
                alt="profile"
                width={44}
                height={44}
                className="rounded-full object-cover border-2 border-[#2f2523]"
              />
            </button>
          </motion.div>
        </div>
      </motion.header>

      <div className="p-5">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search groups by name, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#2b2320] border border-[#3a2f2d] rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#4a403d] transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white font-medium"
                    : "bg-[#2b2320] text-[#d8cdc6] hover:bg-[#3b3230]"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Groups Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {loading ? (
            // Loading skeletons
            Array(4)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <SkeletonBlock className="h-40" />
                  <SkeletonBlock className="h-6 w-3/4" />
                  <SkeletonBlock className="h-4 w-1/2" />
                </div>
              ))
          ) : filteredGroups.length === 0 ? (
            // No results
            <div className="col-span-full text-center py-10">
              <Icon icon="mdi:group-off" className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No groups found</h3>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            // Group cards
            filteredGroups.map((group, idx) => (
              <motion.div
                key={group.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-xl overflow-hidden hover:border-[#4a403d] transition-colors shadow-lg">
                  <CardContent className="p-0 h-full">
                    <div className="h-32 w-full bg-[#1a1614] relative overflow-hidden">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-full h-full object-cover opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1d1514] to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <h3 className="font-semibold text-white text-lg leading-tight">{group.name}</h3>
                        <span className="text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                          {group.members.toLocaleString()} members
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-[#bfb2ac] mb-2">
                        <MapPin size={14} />
                        {group.location}
                        <span className="w-1 h-1 rounded-full bg-[#4a403d]" />
                        {group.category}
                      </div>
                      <p className="text-sm text-[#e0d6d0] mb-4 line-clamp-2">
                        {group.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#bfb2ac] mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MessageSquare size={14} />
                            {group.posts} posts
                          </span>
                          <span className="flex items-center gap-1">
                            <Bell size={14} />
                            {group.lastActive}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleJoinGroup(group.id)}
                        className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                          group.isJoined
                            ? "bg-[#3a2f2d] text-[#d8cdc6] hover:bg-[#4a403d]"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                      >
                        {group.isJoined ? (
                          <>Joined</>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            Join Group
                          </>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Sidebars & Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ProfileSidebar
        isOpen={isProfileSidebarOpen}
        onClose={() => setProfileSidebarOpen(false)}
      />
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAsUnread={markAsUnread}
        onDelete={deleteNotification}
        unreadCount={unreadCount}
      />
      <BottomNavigation />
    </div>
  );
}

export default GroupsPage;