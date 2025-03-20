"use client";

import React, { useEffect, useState } from "react";
import { convertCurrency } from "@/lib/currencyApi";
import BackButton from "@/components/BackButton";
import CurrencySearch from "@/components/CurrencySearch";
import { ArrowRightLeft } from "lucide-react";

export default function ConverterPage() {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>("");
    const [toCurrency, setToCurrency] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        setResult(null);
    }, [amount]);

    const handleConvert = async () => {
        console.log(fromCurrency, toCurrency, amount);

        if (!fromCurrency || !toCurrency || amount <= 0) {
            alert("Please select both currencies and enter a valid amount.");
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

    const handleClearFromCurrency = () => {
        setFromCurrency("");
        setResult(null);
    };

    const handleClearToCurrency = () => {
        setToCurrency("");
        setResult(null);
    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(null);
    };


    return (
        <div className="p-6">
            <BackButton />
            <h1 className="text-2xl font-bold text-center">Currency converter</h1>
            <div className="mt-4">
                <div>
                    <label className="block text-lg mb-2">Amount:</label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border p-2 w-full"
                        placeholder="Enter the amount"
                    />
                </div>
                <div className="flex justify-around items-center mt-4">
                    <div>
                        <label className="block mb-2 text-center">Select a currency from:</label>
                        <CurrencySearch
                            onSelectCurrency={handleSelectFromCurrency}
                            selectedCurrency={fromCurrency}
                            onClear={handleClearFromCurrency}
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
                        <label className="block mb-2 text-center">Select a currency up to:</label>
                        <CurrencySearch
                            onSelectCurrency={handleSelectToCurrency}
                            selectedCurrency={toCurrency}
                            onClear={handleClearToCurrency}
                        />
                    </div>
                </div>
                <div className="mt-9">
                    <button
                        onClick={handleConvert}
                        className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600 transition"
                    >
                        Convert
                    </button>
                </div>

                {result !== null && (
                    <div className="mt-4 p-4 bg-light border rounded shadow-sm">
                        <p className="font-bold text-lg">Result: <span >{amount} {fromCurrency} = {result} {toCurrency} </span></p>
                    </div>
                )}

            </div>
        </div>
    );
}
