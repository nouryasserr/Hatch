const BASE_API_URL = "http://127.0.0.1:8000/api/general";

export const getBestSellersProducts = async () =>
    await axios.get(`${BASE_API_URL}/best-sellers`);

export const getNewArrivalsProducts = async () =>
    await axios.get(`${BASE_API_URL}/new_arrivals`);
