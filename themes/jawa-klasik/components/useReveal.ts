"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    const selectors = ".reveal-up, .reveal-left, .reveal-right, .reveal-scale";
    const observe = () => { document.querySelectorAll(selectors).forEach((el) => { if (!el.classList.contains("visible")) observer.observe(el); }); };
    observe();
    const mutObs = new MutationObserver(observe);
    mutObs.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutObs.disconnect(); };
  }, []);
}
