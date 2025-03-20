"use client";

import { useEffect, useState } from "react";
import { currencies } from "@/data/currencies";

interface CurrencySearchProps {
    onSelectCurrency: (currency: string) => void;
    selectedCurrency?: string;
}

const CurrencySearch = ({ onSelectCurrency, selectedCurrency }: CurrencySearchProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    useEffect(() => {
        if (selectedCurrency) {
            const selected = currencies.find((currency) => currency.code === selectedCurrency);
            if (selected) {
                setSearchTerm(`${selected.name} (${selected.code})`);
            }
        }
    }, [selectedCurrency]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === "") {
            setFilteredCurrencies([]);
        } else {
            const filtered = currencies.filter((currency) =>
                currency.name.toLowerCase().includes(term) ||
                currency.code.toLowerCase().includes(term)
            );
            setFilteredCurrencies(filtered);
        }
        setHighlightedIndex(-1);
    };

    const handleClick = (currency: { code: string; name: string }) => {
        onSelectCurrency(currency.code);
        setSearchTerm(`${currency.name} (${currency.code})`);
        setFilteredCurrencies([]);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for a currency..."
                className="border p-2 w-60"
            />
            {searchTerm && filteredCurrencies.length > 0 && (
                <ul className="absolute bg-white bg-opacity-100 border border-gray-300 w-60 max-h-60 overflow-auto">
                    {filteredCurrencies.map((currency, index) => (
                        <li
                            key={currency.code}
                            className={`p-2 cursor-pointer ${highlightedIndex === index ? "bg-gray-200" : ""
                                }`}
                            onClick={() => handleClick(currency)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {currency.name} ({currency.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CurrencySearch;
