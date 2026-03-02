import type { Transition, Variants } from "framer-motion";

export const SPRING_CONFIGS = {
  gentle: { type: "spring", damping: 20, stiffness: 120, mass: 1 } as const,
  snappy: { type: "spring", damping: 15, stiffness: 150, mass: 0.8 } as const,
  bouncy: { type: "spring", damping: 12, stiffness: 180, mass: 0.7 } as const,
  slow: { type: "spring", damping: 25, stiffness: 90, mass: 1.2 } as const,
} satisfies Record<string, Transition>;

export const TIMING_CONFIGS = {
  fast: { duration: 0.15 } as const,
  normal: { duration: 0.25 } as const,
  slow: { duration: 0.4 } as const,
} satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: SPRING_CONFIGS.snappy },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: SPRING_CONFIGS.snappy },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: SPRING_CONFIGS.snappy },
  exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0, transition: SPRING_CONFIGS.snappy },
};

export const PRESS_SCALE = 0.96;
