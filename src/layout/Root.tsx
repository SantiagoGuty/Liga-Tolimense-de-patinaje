// src/layout/Root.tsx
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

export default function Root() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
