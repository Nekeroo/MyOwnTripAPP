import axios from "axios";

export interface MoneyRate {
    base: string;
    date: string;
    rates: Record<string,number>;
}
const URL = "https://api.frankfurter.dev/v1"

export async function retrieveLatestRates() {
    const response = await axios.get<MoneyRate>(URL+"/latest")

    return response.data;
}