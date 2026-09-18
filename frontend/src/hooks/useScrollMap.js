import { useMotionValue, useMotionValueEvent, transform } from "framer-motion";

// Maps a scroll progress MotionValue to an output range using JS updates only.
// Avoids framer-motion 13's native ScrollTimeline/ViewTimeline acceleration, which
// can leave values stuck (e.g. opacity) inside sticky scroll sections.
export function useScrollMap(progress, input, output) {
  const mv = useMotionValue(transform(progress.get(), input, output));
  useMotionValueEvent(progress, "change", (v) => mv.set(transform(v, input, output)));
  return mv;
}
