"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeIn } from "@/lib/motion";

type RecipeHeroProps = {
  readonly name: string;
  readonly imageUri: string;
  readonly badges: ReadonlyArray<string>;
};

export const RecipeHero = ({ name, imageUri, badges }: RecipeHeroProps) => {
  const router = useRouter();

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="relative"
    >
      <div className="relative h-[340px] w-full">
        <Image
          src={imageUri}
          alt={`Photo of ${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 640px"
          priority
        />
      </div>

      <div className="absolute inset-x-0 top-0 flex h-24 items-start bg-gradient-to-b from-black/50 to-transparent pt-4">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
        <div className="mb-2 flex flex-wrap gap-2">
          {badges
            .filter((badge) => badge.length > 0)
            .map((badge) => (
              <Badge key={badge} variant="accent">
                {badge}
              </Badge>
            ))}
        </div>
        <h1 className="font-display-bold text-2xl text-white">{name}</h1>
      </div>
    </motion.div>
  );
};
