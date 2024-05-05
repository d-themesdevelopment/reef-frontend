import qs from "qs";

interface Props {
  endpoint: string;
  query?: any;
  locale?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param locale - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  locale = "ar",
}: Props): Promise<T> {
  const mergedOptions = {
    next: { revalidate: 10 },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${import.meta.env.STRAPI_Token}`,
    },
  };

  const queryString = qs.stringify(query);

  const requestUrl = `${
    import.meta.env.STRAPI_URL
  }/api/${endpoint}?${queryString}&locale=${locale}`;

  try {
    const res = await fetch(requestUrl, mergedOptions);
    const data = await res.json();

    return data.data as T;
  } catch (error) {
    console.log(error);
    return null as T;
  }
}
