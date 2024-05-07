import { cookies } from "next/headers";

interface GetActionOptions {
    page?: string;
    limit?: string;
    locale?: string;
}

export const getData = async (url: string, options: GetActionOptions = {}) => {
    const { page, limit, locale } = options;
    const baseURL    = process.env.NEXT_PUBLIC_API_URL;

    let queryString = '';
    if (page) queryString += `page=${page}&`;
    if (limit) queryString += `limit=${limit}&`;
    if (locale) queryString += `locale=${locale}`;

    return fetch(`${baseURL}/api/${url}?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
};

