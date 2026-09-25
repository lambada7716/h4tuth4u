// Kurs USD ke IDR saat ini (contoh: Rp17.914)
export const kursUSDkeIDR = 17914;

export function ubahDollarKeRupiah(jumlahDollar: number): string {
  const totalRupiah = jumlahDollar * kursUSDkeIDR;

  // Format ke mata uang Rupiah
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalRupiah);
}

export type CurrencyType = 'USD' | 'IDR';

export function formatPrice(amountUSD: number, currency: CurrencyType = 'USD'): string {
  if (currency === 'IDR') {
    return ubahDollarKeRupiah(amountUSD);
  }
  return `$${amountUSD.toFixed(amountUSD % 1 === 0 ? 0 : 2)}`;
}
