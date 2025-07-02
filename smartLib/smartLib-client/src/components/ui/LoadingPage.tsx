// components/LoadingPage.tsx
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-800 to-purple-900 flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-white"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
        </motion.div>
        <motion.p
          className="text-white text-lg font-semibold tracking-wider"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          Loading, please wait...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
