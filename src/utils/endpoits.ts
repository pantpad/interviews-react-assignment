const productAPI = "/products";

export async function fetchProducts(page: number = 0, limit: number = 10) {
  const response = await fetch(`${productAPI}?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
