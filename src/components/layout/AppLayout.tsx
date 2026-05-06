import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#07111F] text-white">
      <main className="mx-auto min-h-screen max-w-md overflow-hidden bg-[#07111F] pb-24 text-white shadow-2xl">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2">
        <BottomNav />
      </div>
    </div>
  );
}