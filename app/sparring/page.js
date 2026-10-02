import PapanSparring from '@/components/PapanSparring';

export const metadata = {
  title: 'Cari lawan',
  description: 'Papan sparring Gelanggang Petang: tim yang mencari lawan minggu ini, disaring menurut level — santai, menengah, atau kompetitif.',
  alternates: { canonical: '/sparring' },
};

export default function SparringPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-extrabold md:text-4xl">Cari lawan</h1>
      <p className="mt-2 max-w-2xl text-slate-300">Tim yang sudah booking lapangan dan masih butuh lawan. Pasang timmu, atau ajak salah satu tanding. Nama tim di papan ini fiktif.</p>
      <div className="mt-8"><PapanSparring /></div>
    </main>
  );
}
