"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      className="back-top"
      onClick={() => {
        if (window.__lenis) {
          window.__lenis.scrollTo(0);
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <b aria-hidden="true">↑</b>
      Back to top
    </button>
  );
}
