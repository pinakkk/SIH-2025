import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  MapPin,
  ChevronDown,
  Menu,
  MessageCircle,
  Heart,
  Plus,
  ArrowRight,
  Users,
  Bell,
  UserPlus
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { NotificationButton, NotificationPanel } from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { ROUTES } from "@/lib/constants";
import { useUserLocation } from "@/hooks/use-user-location";

// Skeleton Block
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

// Community post interface
interface CommunityPost {
  id: string | number;
  user: string;
  avatar: string;
  status: string;
  time: string;
  caption: string;
  image?: string;
  location: string;
  likes: number;
  comments: number;
  verified?: boolean;
}

// Group interface
interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  avatar: string;
  description: string;
  isJoined: boolean;
}

// News item interface
interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  url: string;
  urlToImage?: string;
  provider: string;
}

// Mock data - will be replaced with API data
const mockPosts: CommunityPost[] = [
  {
    id: 1,
    user: "Ananya Sharma",
    avatar: "https://i.pravatar.cc/40?img=12",
    status: "Marked Safe",
    time: "10:25 AM",
    caption: "The waves are calming down now, but still high tide warning 🚨",
    image: "https://i.imgur.com/AYp2z2A.png",
    location: "Chennai, Tamil Nadu",
    likes: 24,
    comments: 6,
    verified: true
  },
  {
    id: 2,
    user: "Rohit Verma",
    avatar: "https://i.pravatar.cc/40?img=33",
    status: "Need Help",
    time: "9:50 AM",
    caption: "Our street is flooded, need assistance!",
    image: "https://i.imgur.com/AYp2z2A.png",
    location: "Kochi, Kerala",
    likes: 17,
    comments: 12,
    verified: false
  },
];

export function CommunityPage() {
  const userLocation = useUserLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [trendingGroups, setTrendingGroups] = useState<CommunityGroup[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // Notification hook
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteNotification
  } = useNotifications();

  // Handle scroll effect for header
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch community posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('https://api.example.com/community-posts');
        // const data = await response.json();
        // setPosts(data);

        // For now, use mock data
        setTimeout(() => {
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(mockPosts);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch trending groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('https://api.example.com/trending-groups');
        // const data = await response.json();
        // setTrendingGroups(data);

        // For now, use mock data
        setTimeout(() => {
          setTrendingGroups([
            {
              id: "1",
              name: "Odisha Coast Safety",
              members: 1245,
              avatar: "https://i.imgur.com/dmrZcV6.png",
              description: "Updates and support for coastal areas of Odisha",
              isJoined: false
            },
            {
              id: "2",
              name: "Kerala Flood Relief",
              members: 2873,
              avatar: "https://i.imgur.com/nIYWAQZ.png",
              description: "Connecting volunteers with people in need during Kerala floods",
              isJoined: true
            },
            {
              id: "3",
              name: "Chennai Rescue Network",
              members: 989,
              avatar: "https://i.imgur.com/j5rD8KL.png",
              description: "Real-time updates and coordination for Chennai rescue efforts",
              isJoined: false
            }
          ]);
        }, 800);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  // Fetch news items
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);

        // Using real GNews API with key from .env
        const now = new Date();
        const to = now.toISOString();
        const fromDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000); // 15 days ago
        const from = fromDate.toISOString();

        // Fetch from GNews API
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=disaster OR flood OR tsunami OR earthquake OR landslide OR cyclone OR storm OR hazard&lang=en&country=in&from=${encodeURIComponent(
            from
          )}&to=${encodeURIComponent(to)}&max=10&token=${import.meta.env.VITE_GNEWS_API_KEY
          }`
        );

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          // Filter for disaster-related news
          const allowedKeywords = [
            "disaster", "flood", "tsunami", "earthquake", "landslide",
            "cyclone", "storm", "typhoon", "hurricane", "aftershock",
            "quake", "hazard", "evacuation", "alert", "warning",
            "rescue", "surge", "high waves", "coastal", "ocean"
          ];

          const blockedKeywords = [
            "celebrity", "fashion", "lifestyle", "movie", "music",
            "sport", "entertainment", "bollywood", "hollywood"
          ];

          const processedArticles = data.articles.map((a: any, i: number) => ({
            id: `gnews-${i}`,
            title: a.title,
            description: a.description,
            date: new Date(a.publishedAt).toISOString(),
            source: a.source?.name || "GNews",
            url: a.url,
            urlToImage: a.image,
            provider: "GNews"
          }));

          // Filter relevant news
          const filteredNews = processedArticles.filter((a: NewsItem) => {
            const text = `${a.title} ${a.description}`.toLowerCase();
            const isRelevant = allowedKeywords.some((kw) => text.includes(kw.toLowerCase()));
            const isBlocked = blockedKeywords.some((kw) => text.includes(kw.toLowerCase()));
            return isRelevant && !isBlocked;
          });

          // Take only 2 for the community page
          setNewsItems(filteredNews.slice(0, 2));
        } else {
          // Fallback to static data if API fails or returns no results
          setNewsItems([
            {
              id: "news-1",
              title: "High Wave Alert Issued for Odisha Coast",
              description: "The IMD has issued a high wave alert for the coastal regions of Odisha, with waves expected to reach heights of 3-4 meters.",
              date: new Date().toISOString(),
              source: "IMD",
              url: "https://www.imd.gov.in/alerts/coastal",
              urlToImage: "https://i.imgur.com/AYp2z2A.png",
              provider: "GNews"
            },
            {
              id: "news-2",
              title: "Relief Operations Ongoing in Flooded Kerala Districts",
              description: "NDRF teams have been deployed to assist in rescue and relief operations in the flood-affected districts of Kerala.",
              date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
              source: "NDRF",
              url: "https://ndrf.gov.in/operations/kerala",
              urlToImage: "https://i.imgur.com/nIYWAQZ.png",
              provider: "NewsAPI"
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback data in case of error
        setNewsItems([
          {
            id: "news-1",
            title: "High Wave Alert Issued for Odisha Coast",
            description: "The IMD has issued a high wave alert for the coastal regions of Odisha, with waves expected to reach heights of 3-4 meters.",
            date: new Date().toISOString(),
            source: "IMD",
            url: "https://www.imd.gov.in/alerts/coastal",
            urlToImage: "https://i.imgur.com/AYp2z2A.png",
            provider: "GNews"
          },
          {
            id: "news-2",
            title: "Relief Operations Ongoing in Flooded Kerala Districts",
            description: "NDRF teams have been deployed to assist in rescue and relief operations in the flood-affected districts of Kerala.",
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            source: "NDRF",
            url: "https://ndrf.gov.in/operations/kerala",
            urlToImage: "https://i.imgur.com/nIYWAQZ.png",
            provider: "NewsAPI"
          }
        ]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Toggle like on post
  const handleLikePost = (postId: string | number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  // Toggle join group
  const handleJoinGroup = (groupId: string) => {
    setTrendingGroups(groups => groups.map(group => {
      if (group.id === groupId) {
        return { ...group, isJoined: !group.isJoined };
      }
      return group;
    }));
  };

  const filterOptions = ["All", "Marked Safe", "Need Help"];

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
        className="sticky top-0 z-40 bg-[#2b2320]/55 border-b border-[#3a2f2d] px-5 py-4 flex justify-between items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#372a28]/80 hover:bg-[#443331] transition"
          >
            <Menu size={22} />
          </button>

          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div>
            <h1 className="font-bold text-lg">Community</h1>
            <p className="text-sm text-[#d8cdc6] flex items-center">
              <MapPin size={14} className="mr-1" />
              {userLocation}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 relative"
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
      </motion.header>

      <ProfileSidebar
        isOpen={isProfileSidebarOpen}
        onClose={() => setProfileSidebarOpen(false)}
      />

      <div className="px-5 py-4 space-y-8">
        {/* Trending Groups Section */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Users size={20} className="text-orange-400" />
              Trending Groups
            </h2>
            <button
              onClick={() => navigate(ROUTES.GROUPS)}
              className="text-sm text-orange-400 flex items-center hover:text-orange-300 transition-colors"
            >
              View All <ArrowRight size={14} className="ml-1" />
            </button>
          </div>

          {/* Groups Horizontal Scrolling - Fixed Layout */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {trendingGroups.length === 0 ? (
              // Loading skeletons for groups
              <>
                {[1, 2, 3].map(idx => (
                  <div key={idx} className="min-w-[220px] flex-shrink-0">
                    <div className="bg-[#29201e] rounded-xl p-6 border border-[#3a2f2d] h-[220px] flex flex-col items-center">
                      <SkeletonBlock className="h-18 w-18 rounded-full mb-5" />
                      <SkeletonBlock className="h-4 w-28 mb-2" />
                      <SkeletonBlock className="h-3 w-20 mb-6" />
                      <SkeletonBlock className="h-10 w-full rounded-lg" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Actual groups - Clean & Minimal Design with Better Spacing
              trendingGroups.map((group, idx) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="min-w-[220px] flex-shrink-0"
                >
                  <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border-2 border-[#3a2f2d] rounded-xl hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:border-[#4a403d] transition-all h-[220px]">
                    <CardContent className="pt-3 pb-6 px-6 flex flex-col items-center justify-between h-full">
                      <div className="flex flex-col items-center space-y-4">
                        {/* Avatar - perfectly circular, reduced top gap */}
                        <div className="h-20 w-20 rounded-full bg-[#1a1614] overflow-hidden border-4 border-orange-400/40 shadow-xl ring-2 ring-[#1d1514] flex items-center justify-center mt-0">
                          <img
                            src={group.avatar}
                            alt={group.name}
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-center space-y-1">
                          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">{group.name}</h3>
                          <p className="text-xs text-[#bfb2ac] font-medium">{group.members.toLocaleString()} members</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleJoinGroup(group.id)}
                        className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md mt-2 ${group.isJoined
                            ? "bg-[#3a2f2d] text-[#d8cdc6] hover:bg-[#4a403d] border border-[#4a403d]"
                            : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:brightness-110 hover:shadow-lg"
                          }`}
                      >
                        {group.isJoined ? (
                          <>
                            <Icon icon="mdi:check" width={16} height={16} />
                            Joined
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            Join Group
                          </>
                        )}
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>        {/* News Updates Section - Redesigned with Fixed Height Cards */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Bell size={15} className="text-red-400" />
              News Updates
            </h2>
            <button
              onClick={() => navigate('/news-and-updates')}
              className="text-sm text-red-400 flex items-center hover:text-red-300 transition-colors"
            >
              View All <ArrowRight size={14} className="ml-1" />
            </button>
          </div>

          {/* News Items Grid - Professional Fixed Height Cards */}
          <div className="grid grid-cols-2 gap-6">
            {newsLoading ? (
              // News loading skeletons with fixed height
              <>
                {[1, 2].map(idx => (
                  <div key={idx} className="bg-[#1E1614] rounded-xl border border-[#3a2f2d] overflow-hidden shadow-lg h-[420px]">
                    <div className="h-48 w-full">
                      <SkeletonBlock className="h-full w-full" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <SkeletonBlock className="h-6 w-24 rounded-full" />
                        <SkeletonBlock className="h-4 w-16" />
                      </div>
                      <SkeletonBlock className="h-5 w-full" />
                      <SkeletonBlock className="h-5 w-3/4" />
                      <SkeletonBlock className="h-4 w-full" />
                      <SkeletonBlock className="h-4 w-2/3" />
                      <div className="pt-3 border-t border-[#3a2f2d]">
                        <SkeletonBlock className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Check if we have news items
              newsItems.length > 0 ? newsItems.slice(0, 2).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <Card className="bg-[#1E1614] border border-[#3a2f2d] rounded-xl hover:border-[#4a403d] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all shadow-lg overflow-hidden h-[290px] flex flex-col">
                    {/* Image at the very top - No padding */}
                    <div className="h-28 w-full bg-[#1a1614] overflow-hidden flex-shrink-0">
                      {item.urlToImage ? (
                        <img
                          src={item.urlToImage}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('bg-gradient-to-br', 'from-[#2a1f1d]', 'to-[#1a1614]');
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2a1f1d] to-[#1a1614] flex items-center justify-center">
                          <Icon icon="mdi:image-off" className="text-[#4a403d]" width={32} height={32} />
                        </div>
                      )}
                    </div>
                    {/* Content section with reduced gap and padding */}
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        {/* Source (Red Pill) Centered */}
                        <div className="flex items-center justify-center mb-1">
                          <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            {item.source || 'News Source'}
                          </span>
                        </div>
                        {/* Title - Bold, 2 lines max */}
                        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 hover:text-orange-100 transition-colors text-center">
                          {item.title}
                        </h3>
                        {/* Date - Small text, replaces description */}
                        <p className="text-[#bfb2ac] text-xs text-center">
                          {new Date(item.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      {/* Read More link at bottom - no extra gap */}
                      <div className="pt-0.5 border-t border-[#3a2f2d]">
                        <button
                          onClick={() => item.url.startsWith("http") ? window.open(item.url, "_blank") : navigate('/news-and-updates')}
                          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-xs font-semibold transition-colors"
                        >
                          Read More
                          <Icon icon="mdi:arrow-right" width={14} height={14} />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )) : (
                <div className="col-span-2 text-center py-12">
                  <Icon icon="mdi:newspaper-variant-outline" className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No news updates available</h3>
                  <p className="text-sm text-gray-400">
                    Check back later for disaster and weather related news
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Post Something Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => navigate('/post-new'), 350);
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
          >
            <Plus size={18} />
            Post Something
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {filterOptions.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 text-sm rounded-full transition-all whitespace-nowrap ${filter === f
                  ? "bg-white text-black font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                  : "bg-[#3a2f2d] text-[#e9e2dd] hover:bg-[#4a403d] hover:text-white"
                  }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
          <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#3b3230] transition-colors">
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Posts */}
        {loading ? (
          // Post loading skeletons
          Array(2)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="mb-5">
                <SkeletonBlock className="h-14 w-2/3 mb-3" />
                <SkeletonBlock className="h-40 w-full mb-3" />
                <SkeletonBlock className="h-8 w-full" />
              </div>
            ))
        ) : (
          // Actual posts
          posts
            .filter((post) => filter === "All" ? true : post.status === filter)
            .map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
              >
                <Card className="bg-gradient-to-b from-[#29201e] to-[#1d1514] border border-[#3a2f2d] rounded-2xl mb-5 shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.avatar}
                          alt={post.user}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-[#3a2f2d]"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium">{post.user}</p>
                            {post.verified && (
                              <span className="text-blue-400">
                                <Icon icon="mdi:check-decagram" className="w-4 h-4" />
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs flex items-center gap-1.5 ${post.status === "Marked Safe"
                              ? "text-green-400"
                              : "text-red-400"
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${post.status === "Marked Safe"
                                ? "bg-green-400"
                                : "bg-red-400"
                                }`}
                            />
                            {post.status}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{post.time}</span>
                    </div>
                    <p className="text-sm mb-3 text-[#e0d6d0]">{post.caption}</p>
                    {post.image && (
                      <div className="w-full h-44 bg-[#131212] rounded-xl overflow-hidden mb-4 border border-[#3a2f2d]">
                        <img
                          src={post.image}
                          alt="Post media"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-400 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {post.location}
                      </p>
                      <div className="flex gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">{post.likes} likes</span>
                        <span className="flex items-center gap-1">{post.comments} comments</span>
                      </div>
                    </div>
                    <div className="border-t border-[#3a2f2d] pt-3 mt-1 flex gap-2">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition flex items-center justify-center gap-1.5"
                      >
                        <Heart size={16} />
                        Like
                      </button>
                      <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition flex items-center justify-center gap-1.5">
                        <MessageCircle size={16} />
                        Comment
                      </button>
                      <button className="flex-1 py-2 rounded-xl bg-[#2e2a28] text-white font-medium text-sm border border-[#3a2f2d] hover:bg-[#403633] transition">
                        Share
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAsUnread={markAsUnread}
        onDelete={deleteNotification}
        unreadCount={unreadCount}
      />
    </div>
  );
}

export default CommunityPage;
