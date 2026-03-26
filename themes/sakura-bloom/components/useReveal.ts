import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    const observe = () => {
      document
        .querySelectorAll(".reveal-up,.reveal-left,.reveal-right,.reveal-scale")
        .forEach((el) => {
          if (!el.classList.contains("visible")) observer.observe(el);
        });
    };
    observe();
    const m = new MutationObserver(observe);
    m.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      m.disconnect();
    };
  }, []);
}
