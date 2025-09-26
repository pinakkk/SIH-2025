import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, MessageCircle, Heart, Users, Bell, ArrowRight, UserPlus, Menu } from "lucide-react";

import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { ProfileSidebar } from "@/components/layout/ProfileSidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  NotificationButton,
  NotificationPanel,
} from "@/components/ui/NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { ROUTES } from "@/lib/constants";
import { useUserLocation } from "@/hooks/use-user-location";

// Skeleton Block (supports light + dark via tailwind dark: class)
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 dark:bg-[#2a2a2a] animate-pulse rounded-xl ${className}`} />
);

// --- Component Interfaces ---
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

interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  avatar: string;
  description: string;
  isJoined: boolean;
}

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

// --- Mock Data ---
const mockPosts: CommunityPost[] = [
  {
    id: 1,
    user: "Disaster Management Dept.",
    avatar: "https://i.pravatar.cc/40?img=65",
    status: "Official Update",
    time: "11:00 AM",
    caption:
      "High tide warning issued for Tamil Nadu coastal districts. Please stay alert.",
    image: "https://i.imgur.com/AYp2z2A.png",
    location: "Chennai, Tamil Nadu",
    likes: 48,
    comments: 14,
    verified: true,
  },
  {
    id: 2,
    user: "Red Cross NGO",
    avatar: "https://i.pravatar.cc/40?img=52",
    status: "Relief Update",
    time: "10:15 AM",
    caption:
      "Relief materials being distributed at Kochi harbor area. Volunteers available.",
    image: "https://i.imgur.com/nIYWAQZ.png",
    location: "Kochi, Kerala",
    likes: 32,
    comments: 9,
    verified: true,
  },
];

export function CommunityPage() {
  const userLocation = useUserLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [trendingGroups, setTrendingGroups] = useState<CommunityGroup[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteNotification,
    clearAll,
    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch community posts
  useEffect(() => {
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  // Fetch trending groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setTimeout(() => {
          setTrendingGroups([
            { id: "1", name: "Odisha Coast Safety", members: 1245, avatar: "https://i.imgur.com/dmrZcV6.png", description: "Updates and support for coastal areas of Odisha", isJoined: false },
            { id: "2", name: "Kerala Flood Relief", members: 2873, avatar: "https://i.imgur.com/nIYWAQZ.png", description: "Connecting volunteers with people in need during Kerala floods", isJoined: true },
            { id: "3", name: "Chennai Rescue Network", members: 989, avatar: "https://i.imgur.com/j5rD8KL.png", description: "Real-time updates and coordination for Chennai rescue efforts", isJoined: false }
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
        const now = new Date();
        const to = now.toISOString();
        const fromDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
        const from = fromDate.toISOString();
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=disaster OR flood OR tsunami OR earthquake OR landslide OR cyclone OR storm OR hazard&lang=en&country=in&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&max=10&token=${import.meta.env.VITE_GNEWS_API_KEY}`
        );
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          const allowedKeywords = ["disaster", "flood", "tsunami", "earthquake", "landslide", "cyclone", "storm", "typhoon", "hurricane", "aftershock", "quake", "hazard", "evacuation", "alert", "warning", "rescue", "surge", "high waves", "coastal", "ocean"];
          const blockedKeywords = ["celebrity", "fashion", "lifestyle", "movie", "music", "sport", "entertainment", "bollywood", "hollywood"];
          const processedArticles = data.articles.map((a: any, i: number) => ({ id: `gnews-${i}`, title: a.title, description: a.description, date: new Date(a.publishedAt).toISOString(), source: a.source?.name || "GNews", url: a.url, urlToImage: a.image, provider: "GNews" }));
          const filteredNews = processedArticles.filter((a: NewsItem) => {
            const text = `${a.title} ${a.description}`.toLowerCase();
            const isRelevant = allowedKeywords.some((kw) => text.includes(kw.toLowerCase()));
            const isBlocked = blockedKeywords.some((kw) => text.includes(kw.toLowerCase()));
            return isRelevant && !isBlocked;
          });
          setNewsItems(filteredNews.slice(0, 2));
        } else {
          setNewsItems([{ id: "news-1", title: "High Wave Alert Issued for Odisha Coast", description: "The IMD has issued a high wave alert for the coastal regions of Odisha, with waves expected to reach heights of 3-4 meters.", date: new Date().toISOString(), source: "IMD", url: "https://www.imd.gov.in/alerts/coastal", urlToImage: "https://i.imgur.com/AYp2z2A.png", provider: "GNews" }, { id: "news-2", title: "Relief Operations Ongoing in Flooded Kerala Districts", description: "NDRF teams have been deployed to assist in rescue and relief operations in the flood-affected districts of Kerala.", date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), source: "NDRF", url: "https://ndrf.gov.in/operations/kerala", urlToImage: "https://i.imgur.com/nIYWAQZ.png", provider: "NewsAPI" }]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsItems([{ id: "news-1", title: "High Wave Alert Issued for Odisha Coast", description: "The IMD has issued a high wave alert for the coastal regions of Odisha, with waves expected to reach heights of 3-4 meters.", date: new Date().toISOString(), source: "IMD", url: "https://www.imd.gov.in/alerts/coastal", urlToImage: "https://i.imgur.com/AYp2z2A.png", provider: "GNews" }, { id: "news-2", title: "Relief Operations Ongoing in Flooded Kerala Districts", description: "NDRF teams have been deployed to assist in rescue and relief operations in the flood-affected districts of Kerala.", date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), source: "NDRF", url: "https://ndrf.gov.in/operations/kerala", urlToImage: "https://i.imgur.com/nIYWAQZ.png", provider: "NewsAPI" }]);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleLikePost = (postId: string | number) => {
    setPosts(posts.map((post) => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleJoinGroup = (groupId: string) => {
    setTrendingGroups(groups => groups.map(group => group.id === groupId ? { ...group, isJoined: !group.isJoined } : group));
  };

  return (
    // Use tailwind's dark: variant. Ensure tailwind.config.js has darkMode: 'class'
    <div className="min-h-screen font-sans pb-28 bg-gray-50 text-gray-900 dark:bg-[#1f1816] dark:text-white">
      <motion.header
        animate={{
          boxShadow: scrolled ? "0 8px 20px rgba(0,0,0,0.06)" : "0 2px 6px rgba(0,0,0,0.04)",
          backdropFilter: "saturate(120%) blur(6px)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-40 bg-white/70 dark:bg-[#2b2320]/55 border-b border-gray-200 dark:border-[#3a2f2d] px-5 py-4"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/8 dark:bg-[#372a28]/80 hover:brightness-110 transition"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="ml-2">
              <h1 className="font-bold text-lg">Community</h1>
              <p className="text-sm text-gray-600 dark:text-[#d8cdc6] flex items-center">
                <MapPin size={14} className="mr-1" />
                {userLocation}
              </p>
            </div>
          </div>


          <div className="flex items-center gap-3">
            <NotificationButton
              unreadCount={unreadCount}
              onClick={() => setNotificationPanelOpen(true)}
            />
            <button onClick={() => setProfileSidebarOpen(true)} className="flex items-center">
              <img src={user?.photoURL || "https://i.pravatar.cc/40"} alt="profile" width={44} height={44} className="rounded-full object-cover border-2 border-gray-200 dark:border-[#2f2523]" />
            </button>
          </div>
        </div>
      </motion.header>

      <ProfileSidebar isOpen={isProfileSidebarOpen} onClose={() => setProfileSidebarOpen(false)} className="bg-white text-gray-900 dark:bg-[#1f1816] dark:text-white" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ✅ MODIFIED: Added max-w-4xl and mx-auto to constrain width and center the content */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-8">
        {/* Trending Groups Section */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Users size={20} className="text-orange-400" />Trending Groups</h2>
            <button onClick={() => navigate(ROUTES.GROUPS)} className="text-sm text-orange-500 dark:text-orange-400 flex items-center hover:text-orange-400 transition-colors">View All <ArrowRight size={14} className="ml-1" /></button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
            {trendingGroups.length === 0 ? (
              <>{[1, 2, 3].map(idx => (<div key={idx} className="min-w-[220px] flex-shrink-0"><div className="bg-white dark:bg-[#29201e] rounded-xl p-6 border border-gray-200 dark:border-[#3a2f2d] h-[220px] flex flex-col items-center"><SkeletonBlock className="h-18 w-18 rounded-full mb-5" /><SkeletonBlock className="h-4 w-28 mb-2" /><SkeletonBlock className="h-3 w-20 mb-6" /><SkeletonBlock className="h-10 w-full rounded-lg" /></div></div>))}</>
            ) : (
              trendingGroups.map((group, idx) => (
                <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.1 }} className="min-w-[220px] flex-shrink-0">
                  <Card className="dark:bg-gradient-to-b dark:from-[#29201e] dark:to-[#1d1514] bg-white border-2 border-gray-200 dark:border-[#3a2f2d] rounded-xl hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-[#4a403d] transition-all h-[220px]">
                    <CardContent className="pt-3 pb-6 px-6 flex flex-col items-center justify-between h-full">
                      <div className="flex flex-col items-center space-y-4"><div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-[#1a1614] overflow-hidden border-4 border-orange-400/40 shadow-xl ring-2 ring-transparent flex items-center justify-center mt-0"><img src={group.avatar} alt={group.name} className="w-full h-full object-cover rounded-full" loading="lazy" /></div><div className="text-center space-y-1"><h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">{group.name}</h3><p className="text-xs text-gray-600 dark:text-[#bfb2ac] font-medium">{group.members.toLocaleString()} members</p></div></div>
                      <button onClick={() => handleJoinGroup(group.id)} className={`w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md mt-2 ${group.isJoined ? "bg-gray-100 dark:bg-[#3a2f2d] text-gray-900 dark:text-[#d8cdc6] hover:bg-gray-200 dark:hover:bg-[#4a403d] border border-gray-200 dark:border-[#4a403d]" : "bg-gradient-to-r from-orange-400 to-red-500 text-white hover:brightness-110 hover:shadow-lg"}`}>{group.isJoined ? (<><Icon icon="mdi:check" width={16} height={16} />Joined</>) : (<><UserPlus size={16} />Join Group</>)}</button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* News Updates Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Bell size={15} className="text-red-400" />News Updates</h2>
            <button onClick={() => navigate('/news-and-updates')} className="text-sm text-red-500 dark:text-red-400 flex items-center hover:text-red-400 transition-colors">View All <ArrowRight size={14} className="ml-1" /></button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {newsLoading ? (
              <>{[1, 2].map(idx => (<div key={idx} className="bg-white dark:bg-[#1E1614] rounded-xl border border-gray-200 dark:border-[#3a2f2d] overflow-hidden shadow-sm dark:shadow-lg h-[290px]"><div className="h-28 w-full"><SkeletonBlock className="h-full w-full" /></div><div className="p-3 space-y-2"><div className="flex justify-center"><SkeletonBlock className="h-6 w-24 rounded-full" /></div><SkeletonBlock className="h-5 w-full" /><SkeletonBlock className="h-5 w-3/4" /><SkeletonBlock className="h-4 w-1/2 mx-auto" /><div className="pt-2 border-t border-gray-200 dark:border-[#3a2f2d]"><SkeletonBlock className="h-4 w-20" /></div></div></div>))}</>
            ) : (
              newsItems.length > 0 ? newsItems.slice(0, 2).map((item, idx) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }} whileTap={{ scale: 0.98 }} className="cursor-pointer">
                  <Card className="bg-white dark:bg-[#1E1614] border border-gray-200 dark:border-[#3a2f2d] rounded-xl hover:border-gray-300 dark:hover:border-[#4a403d] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all shadow-sm overflow-hidden h-[290px] flex flex-col">
                    <div className="h-28 w-full bg-gray-100 dark:bg-[#1a1614] overflow-hidden flex-shrink-0">{item.urlToImage ? (<img src={item.urlToImage} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; target.parentElement?.classList.add('bg-gradient-to-br', 'from-gray-200', 'to-gray-100', 'dark:from-[#2a1f1d]', 'dark:to-[#1a1614]'); }} />) : (<div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#2a1f1d] dark:to-[#1a1614] flex items-center justify-center"><Icon icon="mdi:image-off" className="text-gray-400 dark:text-[#4a403d]" width={32} height={32} /></div>)}</div>
                    <div className="p-3 flex-1 flex flex-col justify-between"><div className="space-y-1"><div className="flex items-center justify-center mb-1"><span className="inline-block bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{item.source || 'News Source'}</span></div><h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2 hover:text-orange-700 dark:hover:text-orange-100 transition-colors text-center">{item.title}</h3><p className="text-gray-600 dark:text-[#bfb2ac] text-xs text-center">{new Date(item.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</p></div><div className="pt-0.5 border-t border-gray-200 dark:border-[#3a2f2d]"><button onClick={() => item.url.startsWith("http") ? window.open(item.url, "_blank") : navigate('/news-and-updates')} className="inline-flex items-center gap-2 text-orange-500 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-300 text-xs font-semibold transition-colors">Read More <Icon icon="mdi:arrow-right" width={14} height={14} /></button></div></div>
                  </Card>
                </motion.div>
              )) : (<div className="col-span-2 text-center py-12"><Icon icon="mdi:newspaper-variant-outline" className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-400" /><h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No news updates available</h3><p className="text-sm text-gray-600 dark:text-gray-400">Check back later for disaster and weather related news</p></div>)
            )}
          </div>
        </div>

        {/* Divider / Heading for Verified Posts */}
        <div className="border-b border-gray-200 dark:border-[#3a2f2d] pb-2">
          <h2 className="text-lg font-semibold text-orange-600 dark:text-orange-400 text-center">Posts from Verified Officials</h2>
        </div>

        {/* Verified Posts */}
        {loading ? (
          Array(2).fill(0).map((_, idx) => (<div key={idx} className="mb-5"><SkeletonBlock className="h-14 w-2/3 mb-3" /><SkeletonBlock className="h-40 w-full mb-3" /><SkeletonBlock className="h-8 w-full" /></div>))
        ) : (
          posts.filter((p) => p.verified).map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Card className="bg-white dark:bg-gradient-to-b dark:from-[#29201e] dark:to-[#1d1514] border border-gray-200 dark:border-[#3a2f2d] rounded-2xl mb-5 shadow-sm dark:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3"><div className="flex items-center gap-3"><img src={post.avatar} alt={post.user} width={40} height={40} className="rounded-full border-2 border-gray-200 dark:border-[#3a2f2d]" /><div><div className="flex items-center gap-1"><p className="font-medium text-gray-900 dark:text-white">{post.user}</p>{post.verified && (<span className="text-blue-500"><Icon icon="mdi:check-decagram" className="w-4 h-4" /></span>)}</div><p className="text-xs text-orange-600 dark:text-orange-400">{post.status}</p></div></div><span className="text-xs text-gray-500 dark:text-gray-400">{post.time}</span></div>
                  <p className="text-sm mb-3 text-gray-800 dark:text-[#e0d6d0]">{post.caption}</p>
                  {post.image && (<div className="w-full h-44 bg-gray-100 dark:bg-[#131212] rounded-xl overflow-hidden mb-4 border border-gray-200 dark:border-[#3a2f2d]"><img src={post.image} alt="Post media" className="w-full h-full object-cover" loading="lazy" /></div>)}
                  <div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500 dark:text-gray-400 flex items-center"><MapPin size={14} className="mr-1" />{post.location}</p><div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400"><span>{post.likes} likes</span><span>{post.comments} comments</span></div></div>
                  <div className="border-t border-gray-200 dark:border-[#3a2f2d] pt-3 mt-1 flex gap-2"><button onClick={() => handleLikePost(post.id)} className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-[#2e2a28] text-gray-900 dark:text-white font-medium text-sm border border-gray-200 dark:border-[#3a2f2d] hover:bg-gray-200 dark:hover:bg-[#403633] transition flex items-center justify-center gap-1.5"><Heart size={16} />Like</button><button className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-[#2e2a28] text-gray-900 dark:text-white font-medium text-sm border border-gray-200 dark:border-[#3a2f2d] hover:bg-gray-200 dark:hover:bg-[#403633] transition flex items-center justify-center gap-1.5"><MessageCircle size={16} />Comment</button></div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <BottomNavigation />
      <NotificationPanel isOpen={isNotificationPanelOpen} onClose={() => setNotificationPanelOpen(false)} notifications={notifications} onMarkAsRead={markAsRead} onMarkAsUnread={markAsUnread} onDelete={deleteNotification} onClearAll={clearAll} onMarkAllAsRead={markAllAsRead} unreadCount={unreadCount} />
    </div>
  );
}

export default CommunityPage;
