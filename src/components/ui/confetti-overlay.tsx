"use client";

import { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

type ConfettiOverlayProps = {
  readonly onComplete?: () => void;
};

const PIECE_COUNT = 30;
const DURATION = 1.8;
const COLORS = ["#C4653A", "#E8956A", "#D4764A", "#FFB088", "#FF8C5A", "#FFC857", "#5CB85C"];

type PieceConfig = {
  readonly startX: number;
  readonly startY: number;
  readonly endY: number;
  readonly drift: number;
  readonly rotation: number;
  readonly color: string;
  readonly size: number;
  readonly delay: number;
};

const generatePieces = (): PieceConfig[] =>
  Array.from({ length: PIECE_COUNT }, () => ({
    startX: Math.random() * 100,
    startY: -5,
    endY: 110,
    drift: (Math.random() - 0.5) * 15,
    rotation: (Math.random() - 0.5) * 720,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#C4653A",
    size: 6 + Math.random() * 6,
    delay: Math.random() * 0.3,
  }));

const ConfettiPiece = ({ config }: { config: PieceConfig }) => (
  <motion.div
    initial={{
      left: `${config.startX}%`,
      top: `${config.startY}%`,
      rotate: 0,
      opacity: 1,
    }}
    animate={{
      left: `${config.startX + config.drift}%`,
      top: `${config.endY}%`,
      rotate: config.rotation,
      opacity: [1, 1, 1, 0],
    }}
    transition={{
      duration: DURATION,
      delay: config.delay,
      ease: "easeOut",
    }}
    style={{
      position: "absolute",
      width: config.size,
      height: config.size * 0.6,
      borderRadius: 2,
      backgroundColor: config.color,
    }}
  />
);

export const ConfettiOverlay = ({ onComplete }: ConfettiOverlayProps) => {
  const pieces = useMemo(generatePieces, []);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start({ opacity: 0, transition: { duration: 0.3 } }).then(() => {
        onComplete?.();
      });
    }, (DURATION + 0.2) * 1000);

    return () => clearTimeout(timer);
  }, [controls, onComplete]);

  return (
    <motion.div
      animate={controls}
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {pieces.map((config, idx) => (
        <ConfettiPiece key={idx} config={config} />
      ))}
    </motion.div>
  );
};
