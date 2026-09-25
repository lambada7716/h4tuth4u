import React, { createContext, useContext, useState, useEffect } from 'react';
import { kursUSDkeIDR, ubahDollarKeRupiah, CurrencyType, formatPrice } from '../utils/currency';

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  toggleCurrency: () => void;
  formatPrice: (amountUSD: number) => string;
  ubahDollarKeRupiah: (amountUSD: number) => string;
  kursUSDkeIDR: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyType>('USD');

  const setCurrency = (c: CurrencyType) => {
    setCurrencyState(c);
  };

  const toggleCurrency = () => {
    setCurrencyState((prev) => (prev === 'USD' ? 'IDR' : 'USD'));
  };

  const format = (amountUSD: number) => formatPrice(amountUSD, currency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice: format,
        ubahDollarKeRupiah,
        kursUSDkeIDR,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
