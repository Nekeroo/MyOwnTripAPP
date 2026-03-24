import axios from "axios";

export interface ConvertRate {
    amount: number;
    base: string;
    to: string;
}

export interface MoneyRate {
    base: string;
    date: string;
    rates: Record<string,number>;
}
const URL = "https://api.frankfurter.dev/v1"

const LOCAL_URL = "http://localhost:3000"

export async function retrieveLatestRates() {
    const response = await axios.get<MoneyRate>(URL+"/latest")

    return response.data;
}

export async function convertRequestedRate(convertRate: ConvertRate) {
    const response = await axios.post<ConvertRate>(LOCAL_URL+"/latest", convertRate)

    return response.data;
}