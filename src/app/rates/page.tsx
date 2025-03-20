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
    const [searchCurrency, setSearchCurrency] = useState<string | null>("");

    useEffect(() => {
        if (baseCurrency) {
            const fetchRates = async () => {
                try {
                    const rates = await getExchangeRates(baseCurrency);
                    setExchangeRates(rates);
                } catch (error) {
                    console.error("Error fetching exchange rates:", error);
                }
            };

            fetchRates();
        }
    }, [baseCurrency]);

    const filteredRates = searchCurrency
        ? exchangeRates && {
            [searchCurrency]: exchangeRates[searchCurrency],
        }
        : exchangeRates;

    const handleClearSearch = () => {
        setSearchCurrency("");
    };

    return (
        <div className="p-6">
            <BackButton />
            <h1 className="text-2xl font-bold text-center">Currency exchange rates</h1>
            <div className="flex gap-20">
                <div className="mt-4">
                    <span>Select base currency:</span>
                    <CurrencySearch
                        onSelectCurrency={setBaseCurrency}
                        onClear={() => setBaseCurrency(null)}
                    />
                </div>
                <div className="mt-4">
                    <span>Search for currency correlation:</span>
                    <CurrencySearch
                        onSelectCurrency={setSearchCurrency}
                        onClear={handleClearSearch}
                    />
                </div>
            </div>

            <div className="mt-4">
                {baseCurrency ? (
                    filteredRates ? (
                        <CurrencyRatesTable
                            baseCurrency={baseCurrency}
                            exchangeRates={filteredRates}
                        />
                    ) : (
                        <p>Loading...</p>
                    )
                ) : (
                    <p>Please select a currency to display rates.</p>
                )}
            </div>
        </div>
    );
}
