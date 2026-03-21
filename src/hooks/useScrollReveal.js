import { useEffect, useRef } from "react";

/**
 * Adds IntersectionObserver-based scroll reveal to elements
 * with class "reveal". When an element enters the viewport,
 * the "visible" class is added, which triggers the CSS transition
 * defined in global.css.
 */
export function useScrollReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  });
}
