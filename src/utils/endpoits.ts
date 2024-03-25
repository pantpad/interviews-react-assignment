const productAPI = "/poducts";

export async function fetchProducts(
  page: number = 0,
  limit: number = 10,
  signal?: AbortSignal
) {
  //avoid intersectionObserver to fire too many times on page load
  if (limit < 11) {
    limit = 12;
  }

  const response = await fetch(`${productAPI}?page=${page}&limit=${limit}`, {
    signal: signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
