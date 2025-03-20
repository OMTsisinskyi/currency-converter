'use client';

import BackButton from "@/components/BackButton";
import CurrencyRatesTable from "@/components/CurrencyRatesTable";
import CurrencySearch from "@/components/CurrencySearch";
import { getExchangeRates } from "@/lib/currencyApi";
import { ExchangeRates } from "@/types";
import { useEffect, useState } from "react";

export default function RatesPage() {
    const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);

    useEffect(() => {
        if (baseCurrency) {
            const fetchRates = async () => {
                try {
                    const rates = await getExchangeRates(baseCurrency);
                    setExchangeRates(rates.data);
                } catch (error) {
                    console.error("Error fetching exchange rates:", error);
                }
            };

            fetchRates();
        }
    }, [baseCurrency]);

    return (
        <div className="p-6">
            <BackButton />
            <h1 className="text-2xl font-bold text-center">Курси валют</h1>
            <div className="mt-4">
                <CurrencySearch
                    onSelectCurrency={setBaseCurrency}
                />
            </div>

            <div className="mt-4">
                {baseCurrency ? (
                    exchangeRates ? (
                        <CurrencyRatesTable
                            baseCurrency={baseCurrency}
                            exchangeRates={exchangeRates}
                        />
                    ) : (
                        <p>Loading...</p>
                    )
                ) : (
                    <p>Будь ласка, виберіть валюту для відображення курсів.</p>
                )}
            </div>
        </div>
    );
}
