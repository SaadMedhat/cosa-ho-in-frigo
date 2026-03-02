"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeIn } from "@/lib/motion";

export const RecipeDetailSkeleton = () => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    animate="animate"
    className="min-h-screen bg-background"
  >
    <Skeleton className="h-[340px] w-full rounded-none" />

    <div className="px-5 py-4">
      <Skeleton className="mb-3 h-7 w-[80%]" />
      <div className="mb-6 flex gap-2">
        <Skeleton className="h-[26px] w-[80px] rounded-chip" />
        <Skeleton className="h-[26px] w-[80px] rounded-chip" />
      </div>

      <Skeleton className="mb-3 h-6 w-[60%]" />
      <Skeleton className="mb-4 h-12 w-full rounded-card" />

      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex items-center py-3">
          <Skeleton className="mr-3 h-6 w-6 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-1 h-[18px] w-[50%]" />
            <Skeleton className="h-[14px] w-[30%]" />
          </div>
        </div>
      ))}

      <Skeleton className="mb-4 mt-6 h-6 w-[60%]" />

      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="mb-4 flex">
          <Skeleton className="mr-3 h-7 w-7 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
