import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navbarItems } from "@/constants";


export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      {/* Enhanced Navbar */}
      <motion.nav
        className="w-full h-20 px-8 md:px-12 fixed top-0 left-0 z-50 transition-all duration-300"
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 transition-all duration-500">


        </div>

        <div className="relative z-10 h-full flex items-center justify-between max-w-7xl mx-auto">
          {/* Enhanced Logo Section */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <Image
                  src="/navbar.webp"
                  alt="Logo"
                  width={160}
                  height={160}
                  className="relative z-10 rounded-lg"
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                {/* Corner accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Enhanced Navigation */}
          <div className="flex-1 flex justify-center items-center">
            <div className="flex items-center justify-center space-x-12">
              {navbarItems.filter(item => item.title !== "Contact").map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="whitespace-nowrap"
                >
                  <Link href={item.href} className="group relative block py-2">
                    <motion.span
                      className="text-white text-sm font-medium tracking-wide relative z-10 transition-colors group-hover:text-blue-300"
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.title}
                    </motion.span>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/contact" className="group relative">
              <motion.div
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-white font-medium tracking-wide">Contact</span>
              </motion.div>
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>
      </motion.nav>


    </>
  );
}