"use client";

import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

type SuggestionsListProps = {
  readonly suggestions: ReadonlyArray<string>;
  readonly onSelect: (ingredient: string) => void;
  readonly visible: boolean;
};

export const SuggestionsList = ({
  suggestions,
  onSelect,
  visible,
}: SuggestionsListProps) => (
  <AnimatePresence>
    {visible && suggestions.length > 0 && (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-card border border-border bg-card shadow-lg"
      >
        {suggestions.map((suggestion, idx) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            aria-label={`Add ${suggestion}`}
            className={`block w-full px-4 py-3 text-left text-base text-foreground hover:bg-secondary ${
              idx < suggestions.length - 1 ? "border-b border-border" : ""
            }`}
          >
            {suggestion}
          </button>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);
