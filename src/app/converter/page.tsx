"use client";

import React, { useState } from "react";
import { convertCurrency } from "@/lib/currencyApi";
import BackButton from "@/components/BackButton";
import CurrencySearch from "@/components/CurrencySearch";
import { ArrowRightLeft } from "lucide-react";

export default function ConverterPage() {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>("");
    const [toCurrency, setToCurrency] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    const handleConvert = async () => {
        if (!fromCurrency || !toCurrency || amount <= 0) {
            console.error("Please select both currencies and enter a valid amount.");
            return;
        }

        try {
            const conversionResult = await convertCurrency(fromCurrency, toCurrency, amount);
            setResult(conversionResult);
        } catch (error) {
            console.error("Error converting currency:", error);
        }
    };

    const handleSelectFromCurrency = (currency: string) => {
        setFromCurrency(currency);
    };

    const handleSelectToCurrency = (currency: string) => {
        setToCurrency(currency);
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(null);
    };


    return (
        <div className="p-6">
            <BackButton />
            <h1 className="text-2xl font-bold text-center">Конвертер валют</h1>
            <div className="mt-4">
                <div>
                    <label className="block mb-2">Сума</label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border p-2 w-full"
                        placeholder="Введіть суму"
                    />
                </div>
                <div className="flex justify-around items-center mt-4">
                    <div>
                        <label className="block mb-2 text-center">Виберіть валюту з</label>
                        <CurrencySearch
                            onSelectCurrency={handleSelectFromCurrency}
                            selectedCurrency={fromCurrency} 
                        />
                    </div>

            
                    <button
                        type="button"
                        onClick={swapCurrencies}
                        className="bg-gray-200 p-2 rounded-full self-end"
                    >
                        <ArrowRightLeft size={24} />
                    </button>

                    <div>
                        <label className="block mb-2 text-center">Виберіть валюту до</label>
                        <CurrencySearch
                            onSelectCurrency={handleSelectToCurrency}
                            selectedCurrency={toCurrency} 
                        />
                    </div>
                </div>
                <div className="mt-9">
                    <button
                        onClick={handleConvert}
                        className="bg-blue-500 text-white p-2 w-full"
                        disabled={!fromCurrency || !toCurrency || amount <= 0}
                    >
                        Перевести
                    </button>
                </div>

                {result !== null && (
                    <div className="mt-4 p-4 bg-light border rounded shadow-sm">
                        <p className="font-bold text-lg">Результат: <span >{amount} {fromCurrency} = {result} {toCurrency} </span></p>
                    </div>
                )}

            </div>
        </div>
    );
}
