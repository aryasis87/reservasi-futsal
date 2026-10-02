'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Goal } from 'lucide-react';
import { arena, nav } from '@/lib/data';

export default function Kepala() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0b1220]/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2"><Goal size={22} className="text-lime-400" aria-hidden="true" /><span className="text-lg font-extrabold tracking-tight">{arena.name}</span></Link>
        <nav aria-label="Utama" className="flex gap-1 overflow-x-auto text-sm font-bold">
          {nav.map((n) => {
            const aktif = n.href === '/' ? path === '/' : path?.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={aktif ? 'page' : undefined}
                className={`shrink-0 rounded-lg px-3 py-1.5 transition ${aktif ? 'bg-lime-400 text-slate-900' : 'text-slate-200 hover:bg-slate-800 hover:text-lime-300'}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
