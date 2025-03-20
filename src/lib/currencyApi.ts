const API_KEY = process.env.NEXT_PUBLIC_CURRENCY_API_KEY;
const BASE_URL = 'https://api.freecurrencyapi.com/v1';

if (!API_KEY) {
    throw new Error('CURRENCY_API_KEY is missing in the .env file');
}

export const getExchangeRates = async (baseCurrency: string) => {

    console.log("getExchangeRates: ", baseCurrency);

    const url = `${BASE_URL}/latest?apikey=${API_KEY}&base_currency=${baseCurrency}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();

    return data;
};

export const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: number) => {

    const url = `${BASE_URL}/latest?apikey=${API_KEY}&currencies=${toCurrency}&base_currency=${fromCurrency}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to convert currency');
    }

    const data = await response.json();

    if (!data.data || !data.data[toCurrency]) {
        throw new Error('Invalid response from API');
    }

    const rate = data.data[toCurrency];
    const result = amount * rate;

    return Number(result.toFixed(2));
};
