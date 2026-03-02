"use client";

import { motion } from "framer-motion";
import { fadeInDown } from "@/lib/motion";

type EmptyStateProps = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
};

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => (
  <motion.div
    variants={fadeInDown}
    initial="initial"
    animate="animate"
    className="flex flex-1 flex-col items-center justify-center px-8 py-16"
  >
    <span className="mb-4 text-5xl">{icon}</span>
    <h2 className="mb-2 text-center font-display-bold text-xl text-foreground">
      {title}
    </h2>
    <p className="text-center text-base leading-6 text-muted-foreground">
      {description}
    </p>
  </motion.div>
);
