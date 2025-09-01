// src/layout/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Turn off the browser's default scroll restoration so SPA can control it.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      const prev = (history as any).scrollRestoration;
      (history as any).scrollRestoration = 'manual';
      return () => { (history as any).scrollRestoration = prev; };
    }
  }, []);

  useEffect(() => {
    const scrollAllToTop = () => {
      // Window
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Browsers differ: also zero out both roots
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // If you ever re-add a custom scroll container
      const wrapper = document.querySelector('.page-wrapper') as HTMLElement | null;
      if (wrapper) wrapper.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    if (hash) {
      // /route#anchor -> try to scroll to that anchor
      requestAnimationFrame(() => {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else scrollAllToTop();
      });
    } else {
      requestAnimationFrame(scrollAllToTop);
    }
  }, [pathname, hash]);

  return null;
}
