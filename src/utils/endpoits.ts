const productsEndpoint = "/products";

export async function fetchProducts(
  page: number = 0,
  limit: number = 10,
  query: string,
  category: string,
  signal?: AbortSignal
) {
  //avoid intersectionObserver to fire too many times on page load
  if (limit < 11) {
    limit = 12;
  }

  const response = await fetch(
    `${productsEndpoint}?page=${page}&limit=${limit}&q=${query}&category=${category}`,
    {
      signal: signal,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
