const productAPI = "/products";

export async function fetchProducts(page: number = 0, limit: number = 10) {
  //avoid intersectionObserver to fire too many times on page load
  if (limit < 9) {
    limit = 10;
  }

  const response = await fetch(`${productAPI}?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
