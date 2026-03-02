"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeIn, PRESS_SCALE } from "@/lib/motion";

type ChipProps = {
  readonly label: string;
  readonly isSelected?: boolean;
  readonly onPress?: () => void;
  readonly onRemove?: () => void;
  readonly variant?: "default" | "accent";
};

export const Chip = ({
  label,
  isSelected = false,
  onPress,
  onRemove,
  variant = "default",
}: ChipProps) => {
  const handleClick = () => {
    if (onRemove && isSelected) {
      onRemove();
      return;
    }
    onPress?.();
  };

  return (
    <motion.button
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      whileTap={{ scale: PRESS_SCALE }}
      onClick={handleClick}
      aria-label={`${label}${isSelected ? ", selected" : ""}`}
      className={cn(
        "inline-flex cursor-pointer items-center rounded-chip px-4 py-2 transition-colors",
        variant === "accent" && !isSelected && "bg-primary/10 hover:bg-primary/15",
        variant === "default" &&
          !isSelected &&
          "border border-border bg-card hover:bg-secondary",
        isSelected && "bg-primary hover:bg-primary/90",
      )}
    >
      <span
        className={cn(
          "text-sm font-medium",
          isSelected ? "text-white" : "text-foreground",
        )}
      >
        {label}
      </span>
      {isSelected && <span className="ml-2 text-xs text-white/80">&times;</span>}
    </motion.button>
  );
};
