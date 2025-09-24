// // Version 1.0 - Use GNews AS Primary, If Failed - use Currents API, If failed - use news API

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const allowedKeywords = [
  "disaster",
  "flood",
  "tsunami",
  "earthquake",
  "landslide",
  "cyclone",
  "storm",
  "typhoon",
  "hurricane",
  "aftershock",
  "quake",
  "hazard",
  "evacuation",
  "alert",
  "warning",
  "rescue",
  "surge",
  "high waves",
  "coastal",
  "ocean",
  "rainfall",
  "mudslide",
  "flash flood",
];

const blockedKeywords = [
  "celebrity",
  "fashion",
  "lifestyle",
  "movie",
  "music",
  "sport",
  "entertainment",
  "bollywood",
  "hollywood",
  "game",
  "award",
  "festival",
];

const NewsAndUpdatesPage = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const now = new Date();
        const to = now.toISOString();
        const fromDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 60 days ago
        const from = fromDate.toISOString();

        const [gnewsRes, currentsRes, newsApiRes] = await Promise.allSettled([
          // 🔹 GNews primary (India + last 60 days)
          fetch(
            `https://gnews.io/api/v4/search?q=disaster OR flood OR tsunami OR earthquake OR landslide OR cyclone OR storm OR hazard&lang=en&country=in&from=${encodeURIComponent(
              from
            )}&to=${encodeURIComponent(to)}&max=50&token=${
              import.meta.env.VITE_GNEWS_API_KEY
            }`
          ).then((res) => res.json()),

          // Currents (optional, may fail if quota exceeded)
          fetch(
            `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${
              import.meta.env.VITE_CURRENTS_API_KEY
            }`
          ).then((res) => res.json()),

          // NewsAPI (backup)
          fetch(
            `https://newsapi.org/v2/everything?q=disaster OR flood OR tsunami OR earthquake OR landslide OR cyclone OR storm OR hazard OR "ocean hazard"&language=en&sortBy=publishedAt&pageSize=30&apiKey=${
              import.meta.env.VITE_NEWS_API_KEY
            }`
          ).then((res) => res.json()),
        ]);

        let articles: NewsItem[] = [];

        // ✅ GNews
        if (
          gnewsRes.status === "fulfilled" &&
          gnewsRes.value.articles &&
          gnewsRes.value.articles.length > 0
        ) {
          articles.push(
            ...gnewsRes.value.articles.map((a: any, i: number) => ({
              id: `gnews-${i}`,
              title: a.title,
              description: a.description,
              date: new Date(a.publishedAt).toISOString(),
              source: a.source?.name || "GNews",
              url: a.url,
              urlToImage: a.image,
              provider: "GNews",
            }))
          );
        }

        // ✅ Currents (optional)
        if (
          currentsRes.status === "fulfilled" &&
          currentsRes.value.news &&
          currentsRes.value.news.length > 0
        ) {
          articles.push(
            ...currentsRes.value.news.map((a: any, i: number) => ({
              id: `currents-${i}`,
              title: a.title,
              description: a.description,
              date: new Date(a.published).toISOString(),
              source: a.author || a.source || "Currents API",
              url: a.url,
              urlToImage: a.image,
              provider: "Currents",
            }))
          );
        } else {
          console.warn("Currents API unavailable or quota exceeded, skipping.");
        }

        // ✅ NewsAPI
        if (
          newsApiRes.status === "fulfilled" &&
          newsApiRes.value.articles &&
          newsApiRes.value.articles.length > 0
        ) {
          articles.push(
            ...newsApiRes.value.articles.map((a: any, i: number) => ({
              id: `newsapi-${i}`,
              title: a.title,
              description: a.description,
              date: new Date(a.publishedAt).toISOString(),
              source: a.source?.name || "NewsAPI",
              url: a.url,
              urlToImage: a.urlToImage,
              provider: "NewsAPI",
            }))
          );
        }

        // 🔍 Filter irrelevant
        let filtered = articles.filter((a) => {
          const text = `${a.title} ${a.description}`.toLowerCase();
          const isRelevant = allowedKeywords.some((kw) =>
            text.includes(kw.toLowerCase())
          );
          const isBlocked = blockedKeywords.some((kw) =>
            text.includes(kw.toLowerCase())
          );
          return isRelevant && !isBlocked;
        });

        // ❌ Remove duplicates
        const seen = new Set();
        filtered = filtered.filter((a) => {
          const key = a.url || a.title;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        // ⏰ Sort latest first
        const sorted = filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setNews(sorted);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
              News & Updates
            </h1>
            <p className="text-sm text-gray-400">
              Related updates from multiple sources
            </p>
          </div>
        </div>
      </motion.header>

      {/* News Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto p-4 md:p-8 pb-24"
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-red-500" size={32} />
          </div>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-400">
            No relevant disaster updates available right now.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {news.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gradient-to-b from-[#2b2320] to-[#241c1a] rounded-xl overflow-hidden border border-[#3a2f2d] hover:border-[#4a403d] shadow-lg transition-all duration-300 hover:from-[#372a28] hover:to-[#2b2320]"
              >
                {item.urlToImage && (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#d8cdc6] text-sm mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-[#a69489]">
                    <span>
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="italic">
                      {item.source} • {item.provider}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NewsAndUpdatesPage;
