"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently nearest the top of the viewport.
 *
 * Uses a single IntersectionObserver over all sections rather than a scroll
 * listener — the browser does the intersection math off the main thread, so
 * this costs nothing while scrolling.
 *
 * The `rootMargin` shrinks the observation band to a horizontal strip roughly
 * a third of the way down the viewport. Without it, tall sections overlap and
 * two entries report `isIntersecting` at once.
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer whichever intersecting section sits highest on the page, so
        // scrolling up lands on the section you're entering, not leaving.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
