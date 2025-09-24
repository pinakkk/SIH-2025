import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "natural" | "industrial" | "infrastructure";
  severity: "high" | "medium" | "low";
  source: string;
  readTime: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Kolkata Faces Record-Breaking Floods",
    description: "Kolkata and surrounding areas experienced severe flooding with 251.6mm rainfall in 24 hours - the highest since 1988. At least 12 fatalities reported. Citizens advised to avoid low-lying areas and be cautious of electrical hazards.",
    date: "September 2025",
    category: "natural",
    severity: "high",
    source: "Reuters",
    readTime: "3 min read"
  },
  {
    id: "2",
    title: "Electrocution Risk Alert: India Reports Rising Incidents",
    description: "India records approximately 110,000 electrocution fatalities over the past decade. Recent Kolkata flooding highlighted increased risks during natural disasters.",
    date: "August 2025",
    category: "infrastructure",
    severity: "high",
    source: "The Economic Times",
    readTime: "4 min read"
  },
  {
    id: "3",
    title: "Vaishno Devi Pilgrimage Route: Deadly Landslide",
    description: "Heavy rains triggered a devastating landslide near the Vaishno Devi pilgrimage route in Kashmir/Jammu, resulting in over 30 casualties.",
    date: "August 2025",
    category: "natural",
    severity: "high",
    source: "Al Jazeera",
    readTime: "2 min read"
  },
  {
    id: "4",
    title: "Uttarakhand Flash Flood Emergency",
    description: "Dharali region in Uttarakhand hit by sudden flash flood and mudslide, causing widespread destruction and multiple missing persons reports.",
    date: "July 2025",
    category: "natural",
    severity: "high",
    source: "The Guardian",
    readTime: "3 min read"
  },
  {
    id: "5",
    title: "Industrial Tragedy: Telangana Chemical Factory Explosion",
    description: "Major explosion at Sigachi Industries chemical factory claims 46 lives and leaves 33 injured. Investigation ongoing into safety protocols.",
    date: "June 2025",
    category: "industrial",
    severity: "high",
    source: "Official Reports",
    readTime: "5 min read"
  },
  {
    id: "6",
    title: "NH-7 Landslide Risk Assessment",
    description: "The Patalganga–Langsi stretch of NH-7 is now considered high risk for landslides. Even modest rain may trigger dangerous slides affecting traffic.",
    date: "July 2025",
    category: "infrastructure",
    severity: "medium",
    source: "The Times of India",
    readTime: "2 min read"
  }
];

const NewsAndUpdatesPage = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(newsData);
      setLoading(false);
    }, 1500);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const getCategoryColor = (category: NewsItem["category"]) => {
    switch (category) {
      case "natural":
        return "bg-blue-500";
      case "industrial":
        return "bg-red-500";
      case "infrastructure":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: NewsItem["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a1e1c] to-[#1e1614] text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-[#2b2320]/55 backdrop-blur-sm border-b border-[#3a2f2d] px-4 py-4"
      >
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#372a28] flex items-center justify-center hover:bg-[#4a403d] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              Emergency News & Updates
            </h1>
            <p className="text-sm text-gray-400">Stay informed about recent incidents</p>
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto p-4 md:p-8 pb-24"
      >

        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#2b2320] to-[#241c1a] rounded-xl p-4 sm:p-6 animate-pulse border border-[#3a2f2d] shadow-lg"
              >
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-[#3a2f2d] rounded-full w-20"></div>
                  <div className="h-6 bg-[#3a2f2d] rounded-full w-16"></div>
                </div>
                <div className="h-5 bg-[#3a2f2d] rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-[#3a2f2d] rounded w-full mb-2"></div>
                <div className="h-3 bg-[#3a2f2d] rounded w-5/6 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-[#3a2f2d] rounded w-24"></div>
                  <div className="h-3 bg-[#3a2f2d] rounded w-20"></div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {news.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-b from-[#2b2320] to-[#241c1a] rounded-xl p-4 sm:p-6 hover:from-[#372a28] hover:to-[#2b2320] transition-all duration-300 backdrop-blur-sm border border-[#3a2f2d] hover:border-[#4a403d] cursor-pointer group shadow-lg"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                    {item.severity} risk
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#d8cdc6] text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-[#a69489]">
                  <div className="flex items-center gap-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <span className="italic">Source: {item.source}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NewsAndUpdatesPage;