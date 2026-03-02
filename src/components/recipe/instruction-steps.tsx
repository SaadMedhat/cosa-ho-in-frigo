"use client";

import { motion } from "framer-motion";
import { fadeInDown, staggerContainer, staggerItem } from "@/lib/motion";

type InstructionStepsProps = {
  readonly instructions: string;
  readonly youtubeUrl: string | null;
};

const STEP_PATTERN = /(?:^|\n)\s*(?:step\s*)?(\d+)[.):\s]/i;
const NEWLINE_PATTERN = /\r?\n/;

const parseInstructions = (raw: string): string[] => {
  const trimmed = raw.trim();

  if (STEP_PATTERN.test(trimmed)) {
    return trimmed
      .split(/\r?\n/)
      .map((line) =>
        line.replace(/^\s*(?:step\s*)?\d+[.):\s]\s*/i, "").trim(),
      )
      .filter((line) => line.length > 0);
  }

  const byNewline = trimmed
    .split(NEWLINE_PATTERN)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (byNewline.length > 1) return byNewline;

  return trimmed
    .split(/\.\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 10)
    .map((sentence) => (sentence.endsWith(".") ? sentence : `${sentence}.`));
};

export const InstructionSteps = ({
  instructions,
  youtubeUrl,
}: InstructionStepsProps) => {
  const steps = parseInstructions(instructions);

  return (
    <motion.div
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      className="px-5 py-4"
    >
      <h2 className="mb-4 font-display-bold text-xl text-foreground">
        Instructions
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={staggerItem}
            className="mb-4 flex"
          >
            <div className="mr-3 mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
              <span className="text-xs font-bold text-primary">
                {idx + 1}
              </span>
            </div>
            <p className="flex-1 text-base leading-6 text-muted-foreground">
              {step}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {youtubeUrl ? (
        <motion.div variants={fadeInDown} initial="initial" animate="animate" className="mt-2">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch video tutorial on YouTube"
            className="flex items-center justify-center rounded-button bg-[#FF0000] py-3.5 font-semibold text-white transition-opacity hover:opacity-90"
          >
            <span className="mr-2 text-lg">▶</span>
            Watch on YouTube
          </a>
        </motion.div>
      ) : null}
    </motion.div>
  );
};
