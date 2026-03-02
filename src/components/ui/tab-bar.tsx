"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { href: "/", label: "Ricette", icon: "🍳" },
  { href: "/cocktails", label: "Cocktail", icon: "🍹" },
] as const;

export const TabBar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-50 border-t border-border bg-card px-6 pt-2 pb-safe-bottom sm:pb-2">
      <div className="mx-auto flex max-w-lg">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/" || pathname === ""
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={isActive}
              aria-label={`${tab.label} tab`}
              className="flex flex-1 flex-col items-center justify-center py-2"
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <span className="mb-1 text-2xl">{tab.icon}</span>
                <p
                  className={cn(
                    "text-xs font-semibold",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {tab.label}
                </p>
                <div
                  className={cn(
                    "mx-auto mt-1 h-1 w-6 rounded-full transition-all",
                    isActive ? "bg-primary" : "bg-transparent",
                  )}
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
