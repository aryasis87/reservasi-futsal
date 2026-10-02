import Link from 'next/link';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-mono text-7xl font-extrabold text-lime-400">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Bolanya keluar lapangan</h1>
      <p className="mt-3 text-slate-300">Halaman yang kamu cari tidak ditemukan.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-lime-300">Booking lapangan</Link>
        <Link href="/harga" className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-bold text-slate-100 hover:bg-slate-800">Lihat harga</Link>
      </div>
    </main>
  );
}
