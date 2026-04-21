import { API_URL } from "./constants";
import { Product, Collection, Order } from "./types";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getProductsEndpoint = (slug?: string) => {
    if(slug) {
        return `${API_URL}/products.php?slug=${slug}`;
    }
    return `${API_URL}/products.php`;
};

export const getCollectionsEndpoint = (slug?: string) => {
     if(slug) {
        return `${API_URL}/collections.php?slug=${slug}`;
    }
    return `${API_URL}/collections.php`;
};

export const createOrderEndpoint = () => {
     return `${API_URL}/orders.php`;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}
