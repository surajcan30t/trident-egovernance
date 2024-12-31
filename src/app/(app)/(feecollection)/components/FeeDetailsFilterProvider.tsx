'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOptionalValues } from '../server-actions-fee-collection/actions';

type FeesDetailsFilterContextType = {
  filterParticulars: string[];
  sessions: string[];
  paymentMode: string[];
  loading: boolean;
};

type DistinctValues = {
  [key: string]: any[];
} | undefined;

const FeesDetailsFilterContext = createContext<FeesDetailsFilterContextType | undefined>(undefined);

export const FeesDetailsFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterParticulars, setFilterParticulars] = useState<string[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptionValues = async () => {
      try {
        const response:DistinctValues = await getOptionalValues();
        const particulars = response?.particulars || [];
        const sessions = response?.sessions || [];
        const payMode = response?.paymentMode || [];
        setFilterParticulars(particulars);
        setSessions(sessions)
        setPaymentMode(payMode)
      } catch (error) {
        console.error('Error fetching particulars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionValues();
  }, []);

  return (
    <FeesDetailsFilterContext.Provider value={{ filterParticulars, sessions, paymentMode, loading }}>
      {children}
    </FeesDetailsFilterContext.Provider>
  );
};

export const useParticulars = (): FeesDetailsFilterContextType => {
  const context = useContext(FeesDetailsFilterContext);
  if (!context) {
    throw new Error('useParticulars must be used within a ParticularsProvider');
  }
  return context;
};
