import axios from 'axios'
import type { Product } from '../types/product'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
})

function toErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.message ||
      err.response?.statusText ||
      err.message ||
      'Request failed'
    )
  }
  if (err instanceof Error) return err.message
  return 'Something went wrong'
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>('/products', { signal })
    return res.data
  } catch (err) {
    throw new Error(toErrorMessage(err))
  }
}

export async function fetchProductById(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  try {
    const res = await api.get<Product>(`/products/${id}`, { signal })
    return res.data
  } catch (err) {
    throw new Error(toErrorMessage(err))
  }
}

