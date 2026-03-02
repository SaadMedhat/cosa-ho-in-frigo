"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeIn } from "@/lib/motion";

export const ResultsSkeleton = () => (
  <motion.div variants={fadeIn} initial="initial" animate="animate" className="py-4">
    <div className="mb-4 overflow-hidden rounded-card bg-card">
      <Skeleton className="h-[220px] w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="mb-2 h-6 w-[70%]" />
        <Skeleton className="h-7 w-[120px] rounded-chip" />
      </div>
    </div>

    {Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="mb-3 flex overflow-hidden rounded-card bg-card"
      >
        <Skeleton className="h-[100px] w-[100px] rounded-none" />
        <div className="flex flex-1 flex-col justify-center p-3">
          <Skeleton className="mb-2 h-[18px] w-[80%]" />
          <Skeleton className="h-[22px] w-[60px] rounded-chip" />
        </div>
      </div>
    ))}
  </motion.div>
);
