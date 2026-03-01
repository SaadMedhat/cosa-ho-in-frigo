import {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  SlideInRight,
  SlideOutRight,
  SlideInLeft,
  SlideOutLeft,
  type WithSpringConfig,
  type WithTimingConfig,
  Layout,
  ReduceMotion,
} from "react-native-reanimated";

export const SPRING_CONFIGS = {
  gentle: {
    damping: 20,
    stiffness: 120,
    mass: 1,
  } satisfies WithSpringConfig,
  snappy: {
    damping: 15,
    stiffness: 150,
    mass: 0.8,
  } satisfies WithSpringConfig,
  bouncy: {
    damping: 12,
    stiffness: 180,
    mass: 0.7,
  } satisfies WithSpringConfig,
  slow: {
    damping: 25,
    stiffness: 90,
    mass: 1.2,
  } satisfies WithSpringConfig,
} as const;

export const TIMING_CONFIGS = {
  fast: {
    duration: 150,
  } satisfies WithTimingConfig,
  normal: {
    duration: 250,
  } satisfies WithTimingConfig,
  slow: {
    duration: 400,
  } satisfies WithTimingConfig,
} as const;

export const ENTERING = {
  fadeIn: FadeIn.duration(250).reduceMotion(ReduceMotion.System),
  fadeInDown: FadeInDown.duration(300).springify().damping(15).stiffness(150).reduceMotion(ReduceMotion.System),
  fadeInUp: FadeInUp.duration(300).springify().damping(15).stiffness(150).reduceMotion(ReduceMotion.System),
  slideInRight: SlideInRight.duration(300).springify().damping(15).stiffness(150).reduceMotion(ReduceMotion.System),
  slideInLeft: SlideInLeft.duration(300).springify().damping(15).stiffness(150).reduceMotion(ReduceMotion.System),
} as const;

export const EXITING = {
  fadeOut: FadeOut.duration(200).reduceMotion(ReduceMotion.System),
  fadeOutDown: FadeOutDown.duration(200).reduceMotion(ReduceMotion.System),
  fadeOutUp: FadeOutUp.duration(200).reduceMotion(ReduceMotion.System),
  slideOutRight: SlideOutRight.duration(200).reduceMotion(ReduceMotion.System),
  slideOutLeft: SlideOutLeft.duration(200).reduceMotion(ReduceMotion.System),
} as const;

export const LAYOUT_ANIMATION = Layout.springify()
  .damping(15)
  .stiffness(150)
  .reduceMotion(ReduceMotion.System);

export const PRESS_SCALE = 0.96;

export const fadeInDownDelayed = (delayMs: number) =>
  FadeInDown.delay(delayMs)
    .duration(300)
    .springify()
    .damping(15)
    .reduceMotion(ReduceMotion.System);
