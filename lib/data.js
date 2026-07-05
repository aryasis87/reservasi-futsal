// Arena futsal: daftar lapangan + jam operasional + harga per jam.
export const arena = {
  name: 'Arena Futsal Garuda',
  tagline: 'Lapangan vinyl & sintetis kualitas pro',
  pricePerHour: 120000,
};

export const courts = [
  { id: 'A', name: 'Lapangan A', type: 'Vinyl' },
  { id: 'B', name: 'Lapangan B', type: 'Sintetis' },
  { id: 'C', name: 'Lapangan C', type: 'Rumput' },
];

// Jam mulai tiap slot (1 jam).
export const hours = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

const today = new Date().toISOString().slice(0, 10);
// key slot: `${courtId}-${hour}`
export const seedReservations = [
  { id: 'f1', date: today, courtId: 'A', hour: '19:00' },
  { id: 'f2', date: today, courtId: 'A', hour: '20:00' },
  { id: 'f3', date: today, courtId: 'B', hour: '18:00' },
  { id: 'f4', date: today, courtId: 'C', hour: '21:00' },
  { id: 'f5', date: today, courtId: 'B', hour: '21:00' },
];
