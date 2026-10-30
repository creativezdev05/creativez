import { motion } from "framer-motion";

export default function TypedText({ textStr }: { textStr: string }) {
  // 1. Split the sentence into individual words
  const words = textStr.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.010, // Timing between characters
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 }, // Instant typewritten style
    },
  };

  return (
        <motion.h2
          variants={containerVariants}
          initial="hidden"
        //   animate="visible"
          whileInView="visible"
          className="text-left text-2xl leading-relaxed font-medium text-heading md:text-3xl lg:text-4xl"
        >
          {words.map((word, wordIndex) => (
            /* 
              2. Using inline-block as an HTML container element.
              This acts as a solid box around the word, preventing "r" 
              from breaking apart from "ou".
            */
            <span key={wordIndex} style={{ display: "inline-block" }}>
              {Array.from(word).map((char, charIndex) => (
                <motion.span key={charIndex} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              {/* 3. Non-breaking space keeps the space attached to the word block */}
              {wordIndex < words.length - 1 && "\u00A0"}
            </span>
          ))}
        </motion.h2>
  );
}
