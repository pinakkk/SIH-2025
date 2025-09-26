import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full p-1 cursor-pointer shadow-inner border border-gray-300 dark:border-gray-600"
      onClick={toggleTheme}
    >
      {/* Background gradient that changes based on theme */}
      <motion.div
        className={`absolute inset-1 rounded-full transition-all duration-300 ${isDark
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
            : 'bg-gradient-to-r from-amber-400 to-orange-500'
          }`}
        animate={{
          opacity: isDark ? 1 : 0.9,
        }}
      />

      {/* Sliding toggle */}
      <motion.div
        className="relative z-10 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 1 : 1.1,
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-indigo-600" />
          ) : (
            <Sun className="h-4 w-4 text-amber-600" />
          )}
        </motion.div>
      </motion.div>

      {/* Labels */}
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-medium pointer-events-none">
        <span
          className={`transition-opacity duration-300 ${isDark ? "opacity-60 text-white" : "opacity-0"
            }`}
        >
          Dark
        </span>
        <span
          className={`transition-opacity duration-300 ${!isDark ? "opacity-60 text-gray-700" : "opacity-0"
            }`}
        >
          Light
        </span>
      </div>

    </motion.div>
  );
}