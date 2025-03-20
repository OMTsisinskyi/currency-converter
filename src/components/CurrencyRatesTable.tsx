import React from "react";

interface CurrencyRatesTableProps {
    baseCurrency: string;
    exchangeRates: { [currency: string]: number };
}

const CurrencyRatesTable: React.FC<CurrencyRatesTableProps> = ({ baseCurrency, exchangeRates }) => {
    return (
        <div className="space-y-2">
            {Object.keys(exchangeRates).map((currency) => (
                <React.Fragment key={currency}>
                    <p>
                        1 {currency} = {(exchangeRates[currency] * 1).toFixed(2)} {baseCurrency}
                    </p>
                    <hr key={`${currency}-hr`} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default CurrencyRatesTable;
